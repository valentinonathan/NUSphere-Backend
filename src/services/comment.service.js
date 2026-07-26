import db from "../db/index.js"
import { postIdExists } from "../utils/post.ustils.js"

export async function getCommentByPostId(postId) {
    if (!(await postIdExists(postId))) {
        throw new Error("Post Id does not exist");
    }

    const query = await db.query(`
        SELECT comments.*, users.first_name, users.last_name, users.pfp_url
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
    if (!(await postIdExists(postId))) {
        throw new Error("Post Id does not exist")
    }

    const query = await db.query("INSERT INTO comments(post_id, user_id, content) VALUES($1, $2, $3) RETURNING *", [postId, userId, comment]);

    if (query?.rowCount === undefined || query.rowCount == 0) {
        throw new Error("Post comment failed");
    } 

    const id = query.rows[0].id;

    let increaseCommentCount = null;
    try {
        increaseCommentCount = await db.query("UPDATE posts SET comments = comments + 1 WHERE id = $1", [postId]);
    } catch (error) {
        await db.query("DELETE FROM comments WHERE id = $1", [id]);
        throw new Error("Post comment unsuccessful");
    }

    const queryName = await db.query("SELECT first_name, last_name FROM users WHERE id = $1", [userId]);
    query.rows[0].first_name = queryName.rows[0].first_name;
    query.rows[0].last_name = queryName.rows[0].last_name == null ? "" : queryName.rows[0].last_name;

    return query.rows[0];
}