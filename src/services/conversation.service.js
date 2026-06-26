import db from "../db/index.js";

export async function getOrCreateConversation(senderId, receiverId) {
    const sender = Number(senderId);
    const receiver = Number(receiverId);

    if (Number.isNaN(sender) || Number.isNaN(receiver)) {
        throw new Error("Invalid sender or receiver id");
    }

    if (sender === receiver) {
        throw new Error("You cannot start a conversation with yourself");
    }

    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const userQuery = await client.query(
            "SELECT id FROM users WHERE id = $1",
            [receiver]
        );

        if (userQuery.rowCount === 0) {
            throw new Error("Receiver not found");
        }

        const existingConversation = await client.query(
            `
            SELECT c.id, c.type, c.name, c.created_by, c.created_at, c.updated_at
            FROM conversations c
            JOIN conversation_members cm1
              ON cm1.conversation_id = c.id AND cm1.user_id = $1
            JOIN conversation_members cm2
              ON cm2.conversation_id = c.id AND cm2.user_id = $2
            WHERE c.type = 'direct'
            LIMIT 1
            `,
            [sender, receiver]
        );

        if (existingConversation.rowCount > 0) {
            await client.query("COMMIT");
            return existingConversation.rows[0];
        }

        const conversationResult = await client.query(
            `
            INSERT INTO conversations (type, created_by)
            VALUES ('direct', $1)
            RETURNING id, type, name, created_by, created_at, updated_at
            `,
            [sender]
        );

        const conversation = conversationResult.rows[0];

        await client.query(
            `
            INSERT INTO conversation_members (conversation_id, user_id, role)
            VALUES
                ($1, $2, 'member'),
                ($1, $3, 'member')
            `,
            [conversation.id, sender, receiver]
        );

        await client.query("COMMIT");
        return conversation;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

export async function createConversationAndMessage(userId, receiverId, initialMessage = null) {
    const conversation = await getOrCreateConversation(userId, receiverId);

    let createdMessage = null;

    if (initialMessage && initialMessage.trim().length > 0) {
        createdMessage = await createMessage(userId, conversation.id, initialMessage.trim());
    }

    const messages = await getMessagesByConversation(userId, conversation.id);

    return {
        userId,
        conversation,
        createdMessage,
        messages,
    };
}

export async function getConversationsByUserId(userId) {
    const result = await db.query(
        `
        SELECT
            c.id AS conversation_id,
            c.type,
            c.name,
            c.created_at AS conversation_created_at,
            u.id AS other_user_id,
            u.username AS other_username,
            u.first_name AS other_first_name,
            u.last_name AS other_last_name,
            m.content AS last_message,
            m.created_at AS last_message_at
        FROM conversations c
        JOIN conversation_members me
          ON me.conversation_id = c.id
         AND me.user_id = $1
        LEFT JOIN LATERAL (
            SELECT cm.user_id AS other_user_id
            FROM conversation_members cm
            WHERE cm.conversation_id = c.id
              AND cm.user_id <> $1
            ORDER BY cm.user_id
            LIMIT 1
        ) other ON true
        LEFT JOIN users u
          ON u.id = other.other_user_id
        LEFT JOIN LATERAL (
            SELECT content, created_at
            FROM messages
            WHERE conversation_id = c.id
            ORDER BY created_at DESC
            LIMIT 1
        ) m ON true
        ORDER BY COALESCE(m.created_at, c.created_at) DESC
        `,
        [userId]
    );

    return result.rows;
}

export async function getMessagesByConversation(userId, conversationId) {
    const membership = await db.query(
        `
        SELECT 1
        FROM conversation_members
        WHERE conversation_id = $1
          AND user_id = $2
        LIMIT 1
        `,
        [conversationId, userId]
    );

    if (membership.rowCount === 0) {
        throw new Error("Access denied");
    }

    const messages = await db.query(
        `
        SELECT id, sender_id, content, created_at
        FROM messages
        WHERE conversation_id = $1
        ORDER BY created_at ASC
        `,
        [conversationId]
    );

    return messages.rows;
}

export async function createMessage(userId, conversationId, content) {
    const membership = await db.query(
        `
        SELECT 1
        FROM conversation_members
        WHERE conversation_id = $1
          AND user_id = $2
        LIMIT 1
        `,
        [conversationId, userId]
    );

    if (membership.rowCount === 0) {
        throw new Error("Access denied");
    }

    const result = await db.query(
        `
        INSERT INTO messages (conversation_id, sender_id, content)
        VALUES ($1, $2, $3)
        RETURNING id, sender_id, content, created_at
        `,
        [conversationId, userId, content]
    );

    return result.rows[0];
}

export async function isUserInConversation(userId, conversationId) {
    const result = await db.query(
        `
        SELECT 1
        FROM conversation_members
        WHERE conversation_id = $1
          AND user_id = $2
        LIMIT 1
        `,
        [conversationId, userId]
    );

    return result.rowCount > 0;
}