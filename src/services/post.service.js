import db from "../db/index.js"
import { postIdExists } from "../utils/post.ustils.js";
import { userIdExists, usernameExists } from "../utils/user.utils.js"

export async function getPostsByUserId(userId) {
    if (!(await userIdExists(userId))) {
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
    if (!(await usernameExists(username))) {
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

export async function getPostById(postId) {
    const query = await db.query(`
        SELECT posts.*, users.id, users.username, users.first_name, users.last_name
        FROM posts
        JOIN users
        ON posts.user_id = users.id
        WHERE posts.id = $1;
    `, [postId]);

    if (query.rowCount == 0) {
        throw new Error("Post not found");
    }

    return query.rows[0];
}

export async function likePostById(userId, postId) {
    if (!(await postIdExists(postId))) {
        throw new Error("Post Id does not exist");
    }

    console.log(userId);
    console.log(postId);
    const query = await db.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [userId, postId]);

    if (query?.rowCount === undefined || query.rowCount == 0) {
        throw new Error("Like post unsuccessful");
    } 

    let incrementLike = null;
    try {
        incrementLike = await db.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [postId]);
    } catch (error) {
        await db.query("DELETE FROM likes WHERE user_id = $1 AND post_id = $2", [userId, postId]);
        throw new Error("Like post unsuccessful");
    }
}

export async function unlikePostById(userId, postId) {
    if (!(await postIdExists(postId))) {
        throw new Error("Post Id does not exist");
    }

    const query = await db.query("DELETE FROM likes WHERE user_id = $1 AND post_id = $2", [userId, postId]);

    if (query?.rowCount === undefined || query.rowCount == 0) {
        throw new Error("Unlike post unsuccessful");
    } 

    let decrementLike = null;
    try {
        decrementLike = await db.query("UPDATE posts SET likes = likes - 1 WHERE id = $1", [postId]);
    } catch (error) {
        await db.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [userId, postId]);
        throw new Error("Unlike post unsuccessful");
    }
}

export async function hasLiked(userId, postId) {
    if (!(await postIdExists(postId))) {
        throw new Error("Post Id does not exist");
    }
    const query = await db.query("SELECT FROM likes WHERE user_id = $1 AND post_id = $2", [userId, postId]);

    if (query.rowCount == 0) {
        return false;
    } else {
        return true;
    }
}

export async function createPost(userId, url, caption = null) {
    const query = await db.query(
        "INSERT INTO posts (user_id, url, caption) VALUES ($1, $2, $3) RETURNING id, user_id, url, caption, created_at",
        [userId, url, caption]
    );

    if (query?.rowCount === undefined || query.rowCount === 0) {
        throw new Error("Failed to create post");
    }

    const post = query.rows[0];
    return {
        postId: post.id,
        post: post
    };
}