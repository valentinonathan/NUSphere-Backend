import db from "../db/index.js";

export async function getOrCreateConversation(userId, otherUserId) {
    const user1Id = Math.min(userId, otherUserId);
    const user2Id = Math.max(userId, otherUserId);

    if (user1Id == user2Id) {
        throw new Error("Can not create conversation with yourself")
    }

    const existing = await db.query(`
        SELECT id FROM conversations
        WHERE user1_id=$1 and user2_id=$2`,
        [user1Id, user2Id]
    )

    let conversationId;

    if (existing.rowCount == 0) {
        const conversationRow = await db.query(`
            INSERT INTO conversations (user1_id, user2_id) 
            VALUES($1, $2) 
            RETURNING id`,
            [user1Id, user2Id]
        )

        conversationId = conversationRow.rows[0].id

    } else {
        conversationId = existing.rows[0].id
    }

    const messages = await getMessages(conversationId);

    return {conversationId : conversationId, messages : messages.messages};
}

export async function getMessages(conversationId) {
    const messages = await db.query("SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC", [conversationId])

    return {messages : messages.rows};
}

export async function createMessage(senderId, conversationId, content) {
    const result = await db.query("INSERT INTO messages (sender_id, conversation_id, content) VALUES($1, $2, $3) RETURNING *", [senderId, conversationId, content])

    return result.rows[0];
}

export async function isUserInConversation(userId, conversationId) {
    let allowed = await db.query("SELECT * FROM conversations WHERE id = $2 AND (user1_id = $1 OR user2_id = $1)", [userId, conversationId])

    return allowed.rowCount > 0
}

