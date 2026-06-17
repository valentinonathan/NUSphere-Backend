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

export async function postCommentByPostId(postId, userId, comment) {
    if (!postIdExists(postId)) {
        throw new Error("Post Id does not exist")
    }

    const query = await db.query("INSERT INTO comments(post_id, user_id, content) VALUES($1, $2, $3)", [postId, userId, comment]);

    if (query?.rowCount === undefined || query.rowCount == 0) {
        throw new Error("Post comment failed");
    } 

    const increaseCommentCount = await db.query("UPDATE posts SET comments = comments + 1 WHERE id = $1", [postId]);
}