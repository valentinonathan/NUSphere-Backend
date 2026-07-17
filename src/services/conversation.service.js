import db from "../db/index.js";

export async function createMessage() {

}

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

    return {conversationId : conversationId};
}

