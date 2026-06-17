import db from "../db/index.js"
import { userIdExists, usernameExists } from "../utils/user.utils.js"

export async function getPostsByUserId(userId) {
    if (!userIdExists(userId)) {
        throw new Error("UserId does not exist")
    }

    const query = await db.query(`
        SELECT posts.*, users.username
        FROM posts 
        JOIN users 
        ON posts.user_id = users.id 
        WHERE user_id = $1;
    `, [userId]);

    return {posts: query.rows, count: query.rowCount};
}

export async function getPostsByUsername(username) {
    if (!usernameExists(username)) {
        throw new Error("Username does not exist")
    }

    const query = await db.query(`
        SELECT posts.*, users.username
        FROM posts 
        JOIN users 
        ON posts.user_id = users.id 
        WHERE users.username = $1;
    `, [username]);

    return {posts: query.rows, count: query.rowCount};
}