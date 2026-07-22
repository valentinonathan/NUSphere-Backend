import db from "../db/index.js"

export async function isExistModule(moduleCode) {
    const query = await db.query("SELECT * FROM modules WHERE title = $1", [moduleCode]);

    return query.rowCount > 0;
}

export async function isExistThread(threadId) {
    const query = await db.query("SELECT * FROM threads WHERE id = $1", [threadId]);

    return query.rowCount > 0;
}

export async function isExistReply(replyId) {
    const query = await db.query("SELECT * FROM replies WHERE id = $1", [replyId]);

    return query.rowCount > 0;
}

export async function hasReplyUpvote(replyId, userId) {
    const query = await db.query("SELECT * FROM reply_upvote WHERE reply_id = $1 AND user_id = $2", [replyId, userId]);

    return query.rowCount > 0;
}

export async function hasReplyDownvote(replyId, userId) {
    const query = await db.query("SELECT * FROM reply_downvote WHERE reply_id = $1 AND user_id = $2", [replyId, userId]);

    return query.rowCount > 0;
}

export async function checkAttendance(userId, moduleCode) {
    const query = await db.query("SELECT * FROM modules_attendance ma JOIN modules m ON ma.module_id = m.id WHERE ma.user_id = $1 AND m.title = $2", [userId, moduleCode]);

    console.log(query);

    return query.rowCount > 0;
}

export async function moduleTitleToId(moduleCode) {
    const query = await db.query("SELECT id FROM modules WHERE title = $1", [moduleCode]);
    
    if (query.rowCount > 0) {
        return query.rows[0].id;
    } else {
        return null;
    }
}

export async function hasThreadUpvote(threadId, userId) {
    const query = await db.query("SELECT * FROM thread_upvote WHERE thread_id = $1 AND user_id = $2", [threadId, userId]);
    return query.rowCount > 0;
}

export async function hasThreadDownvote(threadId, userId) {
    const query = await db.query("SELECT * FROM thread_downvote WHERE thread_id = $1 AND user_id = $2", [threadId, userId]);

    return query.rowCount > 0;
}

