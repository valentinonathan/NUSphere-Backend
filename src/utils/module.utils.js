import db from "../db/index.js"

export async function isExistModule(moduleCode) {
    const query = await db.query("SELECT * FROM modules WHERE title = $1", [moduleCode]);

    return query.rowCount > 0;
}

export async function isExistThread(threadId) {
    const query = await db.query("SELECT * FROM threads WHERE id = $1", [threadId]);

    return query.rowCount > 0;
}