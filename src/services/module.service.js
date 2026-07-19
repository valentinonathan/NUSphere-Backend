import db from "../db/index.js"
import { userIdExists } from "../utils/user.utils.js";

export async function getMyModule(userId) {
    const query = await db.query(`
        SELECT modules.*
        FROM modules_attendance
        JOIN modules
        ON modules_attendance.module_id = modules.id
        WHERE user_id = $1
    `, [userId]);

    if (query?.rows === undefined) {
        throw new Error("Query to database failed");
    } 

    return query.rows;
}

function groupByWeek(threads) {
    const results = {};

    threads.forEach(t => {
        if (!results[t.week]) {
            results[t.week] = [];
        }

        results[t.week].push(t);
    });

    return results;
}

export async function getModuleThreadsGeneral(moduleCode) {
    const query = await db.query(`
        SELECT threads.*, modules.title AS module_title, users.first_name, users.last_name, users.username
        FROM threads 
        JOIN modules ON threads.module_id = modules.id 
        JOIN users ON threads.user_id = users.id
        WHERE modules.title = $1 
        ORDER BY week DESC, upvote DESC, created_at DESC`
    , [moduleCode]);

    if (query?.rows === undefined) {
        throw new Error("Request threads from database failed");
    }

    let results = groupByWeek(query.rows);
    results.message = "Request module threads successful";
    return results;
}

export async function getModuleThreadsByCategory(category, moduleCode) {
    const query = await db.query(`
        SELECT threads.*,  modules.title AS module_title, users.first_name, users.last_name, users.username
        FROM threads 
        JOIN modules ON threads.module_id = modules.id 
        JOIN users ON threads.user_id = users.id
        WHERE modules.title = $1 AND category = $2
        ORDER BY week DESC, upvote DESC, created_at DESC
    `, [moduleCode, category]);

    if (query?.rows === undefined) {
        throw new Error("Request threads from database failed");
    }

    const results = groupByWeek(query.rows);
    results.message = "Request module threads successful";
    return results;
}

function buildReplyTree(replies) {
    const results = [];
    const map = {};

    replies.forEach(reply => {
        reply.replies = [];
        map[reply.id] = reply;
    });

    replies.forEach(r => {
        if (r.parent_reply_id == null) {
            results.push(r);
        } else {
            map[r.parent_reply_id].replies.push(r);
        }
    });
    return results;
}

export async function getThreadReplies(threadId) {
    const query = await db.query(`
        SELECT replies.*, users.first_name, users.last_name, users.username
        FROM replies 
        JOIN users ON replies.user_id = users.id
        WHERE thread_id = $1
        ORDER BY parent_reply_id NULLS FIRST, upvote DESC, created_at DESC
    `, [threadId]);

    if (query?.rows === undefined) {
        throw new Error("Request replies from database failed");
    }

    const results = buildReplyTree(query.rows);
    return results;
}