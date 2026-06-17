import db from "../db/index.js"
import { postIdExists } from "../utils/post.ustils.js"

export async function getCommentByPostId(postId) {
    if (!postIdExists(postId)) {
        throw new Error("Post Id does not exist");
    }

    const query = await db.query(`
        SELECT comments.*, users.first_name, users.last_name
        FROM comments
        JOIN posts
        ON comments.post_id = posts.id
        JOIN users
        ON comments.user_id = users.id
        WHERE posts.id = $1
    `, [postId]);

    return {comments: query.rows, count: query.rowCount};
}