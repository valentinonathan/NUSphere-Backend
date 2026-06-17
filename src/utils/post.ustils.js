import db from "../db/index.js"

export async function postIdExists(postId) {
    const query = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);

    if (query.rowCount == 0) {
        return false
    } else {
        return true;
    }
}