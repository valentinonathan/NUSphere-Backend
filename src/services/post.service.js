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
        SELECT posts.*, users.id, users.username, users.first_name, users.last_name, users.pfp_url
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

export async function updateNewPostUser(userId, postId) {
    if (!(await userIdExists(userId))) {
        throw new Error("User Id does not exist");
    }

    const query = await db.query("UPDATE users SET new_post = $1", [postId]);
}

export async function feedRequest(userId, page) {
    if (!(await userIdExists(userId))) {
        throw new Error("User Id does not exist");
    }

    const limit = 20;
    const offset = (page - 1) * 20;

    const query = await db.query(`
        SELECT *
        FROM (
            -- FRIEND POSTS (priority 1)
            SELECT 
                posts.id,
                posts.created_at,
                posts.likes,
                1 AS priority
            FROM friends 
            JOIN posts
            ON friends.user2_id = posts.user_id
            WHERE friends.user1_id = $1

            UNION ALL

            SELECT 
                posts.id,
                posts.created_at,
                posts.likes,
                1 AS priority
            FROM friends 
            JOIN posts 
            ON friends.user1_id = posts.user_id
            WHERE friends.user2_id = $1


            UNION ALL

            -- FALLBACK POSTS (priority 2)
            SELECT 
                posts.id,
                posts.created_at,
                posts.likes,
                2 AS priority
            FROM posts
            WHERE posts.user_id NOT IN (
                SELECT user2_id FROM friends WHERE user1_id = $1
                UNION
                SELECT user1_id FROM friends WHERE user2_id = $1
            )
        ) feed

        ORDER BY 
            priority ASC,
            created_at DESC,
            likes DESC

        LIMIT $2 OFFSET $3;
    `, [userId, limit, offset]);
    
    if (page == 1) {
        const checkHasNewPost = await db.query("SELECT new_post FROM users WHERE id = $1", [userId]);

        if (checkHasNewPost.rows?.[0]?.new_post != undefined && checkHasNewPost.rows?.[0]?.new_post != -1) {
            const newPost = await db.query("SELECT id, created_at FROM posts WHERE id = $1", [checkHasNewPost.rows[0].new_post]);
            await db.query("UPDATE users SET new_post = $1", [-1]);
            query.rows = [newPost.rows[0], ...query.rows];
        }
    }

    return {posts: query.rows, page: Number(page), total: query.rowCount}; 
}