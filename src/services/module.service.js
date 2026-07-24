import db from "../db/index.js"
import { checkAttendance, getThreadById, hasReplyDownvote, hasReplyUpvote, hasThreadDownvote, hasThreadUpvote, moduleTitleToId } from "../utils/module.utils.js";
import { getUserDetailsByUserId, userIdExists } from "../utils/user.utils.js";

export async function createThreads(title, url, body, category, week, moduleCode, userId) {
    const moduleId = await moduleTitleToId(moduleCode);
    const query = await db.query(`
        INSERT INTO threads(title, user_id, module_id, image_url, body, category, week) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `, [title, userId, moduleId, url, body, category, Number(week)]);

    if (query?.rowCount === undefined || query.rowCount === 0) {
        throw new Error("Failed to create post");
    }

    await db.query("UPDATE users SET new_thread = $1 WHERE id = $2", [query?.rows?.[0]?.id, userId]);

    return {message: "createThreads successful"};
}

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

export async function getFeedModule(userId) {
    const query = await db.query("SELECT * FROM modules m WHERE NOT EXISTS (SELECT 1 FROM modules_attendance ma WHERE ma.user_id = $1 AND ma.module_id = m.id)", [userId]);

    if (query?.rows === undefined) {
        throw new Error("Query to database failed");
    } 

    return query.rows;
}

export async function getModule(moduleCode) {
    const query = await db.query("SELECT * FROM modules WHERE title = $1", [moduleCode]);
    
    if (query?.rowCount == 0) {
        throw new Error("Query to database failed");
    } 

    return query.rows[0];
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

export async function getModuleThreadsGeneral(moduleCode, userId) {
    const query = await db.query(`
        SELECT
            threads.*,
            modules.title AS module_title,
            users.first_name,
            users.last_name,
            users.username,
            users.pfp_url,
            (tu.user_id IS NOT NULL) AS has_upvoted,
            (td.user_id IS NOT NULL) AS has_downvoted
        FROM threads
        JOIN modules
            ON threads.module_id = modules.id
        JOIN users
            ON threads.user_id = users.id
        LEFT JOIN thread_upvote tu
            ON tu.thread_id = threads.id
            AND tu.user_id = $2
        LEFT JOIN thread_downvote td
            ON td.thread_id = threads.id
            AND td.user_id = $2
        WHERE modules.title = $1
        AND category = 'General'
        ORDER BY
            week DESC,
            upvote DESC,
            created_at DESC;`
    , [moduleCode, userId]);

    if (query?.rows === undefined) {
        throw new Error("Request threads from database failed");
    }

    let results = groupByWeek(query.rows);

    const userDetails = await getUserDetailsByUserId(userId);
    
    if (userDetails?.new_thread != undefined && userDetails?.new_thread != -1) {
        const newThread = await getThreadById(userDetails.new_thread, userId);
        if (newThread?.category !== undefined && newThread.category == "General") {
            results.newThread = newThread;
            await db.query("UPDATE users SET new_thread = $1 WHERE id = $2", [-1, userId]);
        }
    }

    results.message = "Request module threads successful";
    return results;
}

export async function getModuleThreadsByCategory(category, moduleCode, userId) {
    const query = await db.query(`
        SELECT
            threads.*,
            modules.title AS module_title,
            users.first_name,
            users.last_name,
            users.username,
            users.pfp_url,
            (tu.user_id IS NOT NULL) AS has_upvoted,
            (td.user_id IS NOT NULL) AS has_downvoted
        FROM threads
        JOIN modules
            ON threads.module_id = modules.id
        JOIN users
            ON threads.user_id = users.id
        LEFT JOIN thread_upvote tu
            ON tu.thread_id = threads.id
            AND tu.user_id = $3
        LEFT JOIN thread_downvote td
            ON td.thread_id = threads.id
            AND td.user_id = $3
        WHERE modules.title = $1
        AND category = $2
        ORDER BY
            week DESC,
            upvote DESC,
            created_at DESC;
    `, [moduleCode, category, userId]);

    if (query?.rows === undefined) {
        throw new Error("Request threads from database failed");
    }

    const results = groupByWeek(query.rows);

    const userDetails = await getUserDetailsByUserId(userId);

    if (userDetails?.new_thread != undefined && userDetails?.new_thread != -1) {
        const newThread = await getThreadById(userDetails.new_thread, userId);
        if (newThread?.category !== undefined && newThread.category == category) {
            results.newThread = newThread;
            await db.query("UPDATE users SET new_thread = $1 WHERE id = $2", [-1, userId]);
        }
    }

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

export async function getThreadReplies(threadId, userId) {
    const query = await db.query(`
        SELECT
            replies.*,
            users.first_name,
            users.last_name,
            users.username,
            users.pfp_url, 
            (ru.user_id IS NOT NULL) AS has_upvoted,
            (rd.user_id IS NOT NULL) AS has_downvoted
        FROM replies
        JOIN users
            ON replies.user_id = users.id
        LEFT JOIN reply_upvote ru
            ON ru.reply_id = replies.id
            AND ru.user_id = $1
        LEFT JOIN reply_downvote rd
            ON rd.reply_id = replies.id
            AND rd.user_id = $1
        WHERE replies.thread_id = $2
        ORDER BY
            parent_reply_id NULLS FIRST,
            upvote DESC,
            created_at DESC;
    `, [userId, threadId]);

    if (query?.rows === undefined) {
        throw new Error("Request replies from database failed");
    }

    const results = buildReplyTree(query.rows);
    return results;
}

export async function postThreadReplies(userId, moduleCode, threadId, reply, parentReplyId) {
    const moduleId = await moduleTitleToId(moduleCode);

    if (!(await userIdExists(userId))) {
        throw new Error("UserId does not exist");
    }
    let query = null;

    const client = await db.connect();
    try {
        await client.query("BEGIN");
        if (parentReplyId > -1) {
            query = await client.query("INSERT INTO replies(user_id, module_id, thread_id, parent_reply_id, body) VALUES ($1, $2, $3, $4, $5) RETURNING * ", [userId, moduleId, threadId, parentReplyId, reply]);
        } else {
            query = await client.query("INSERT INTO replies(user_id, module_id, thread_id, body) VALUES ($1, $2, $3, $4) RETURNING *", [userId, moduleId, threadId, reply]);
        }
        await client.query("UPDATE threads SET replies = replies + 1 WHERE id = $1", [threadId]);
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }

    if (query?.rowCount === undefined || query.rowCount == 0) {
        throw new Error("Insert into database failed");
    }

    const userDetail = await getUserDetailsByUserId(userId);

    if (userDetail != "") {
        query.rows[0].username = userDetail?.username;
        query.rows[0].first_name = userDetail?.first_name;
        query.rows[0].last_name = userDetail?.last_name;
    }

    console.log(query.rows[0]);

    return {message: "Post thread reply successful", reply: query.rows[0]};
}

export async function postAttendance(moduleCode, userId) {
    if (await checkAttendance(userId, moduleCode)) {
        throw new Error("Already attended");
    }

    const moduleId = await moduleTitleToId(moduleCode);

    const client = await db.connect();
    try {
        await client.query("BEGIN");
        await client.query("INSERT INTO modules_attendance(module_id, user_id) VALUES($1, $2)", [moduleId, userId]);
        await client.query("UPDATE modules SET atendees = atendees + 1 WHERE id = $1", [moduleId]);
        await client.query("COMMIT");

        return {message: "Post attendance successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }

}

export async function deleteAttendance(moduleCode, userId) {
    if (!(await checkAttendance(userId, moduleCode))) {
        throw new Error("Not attended");
    }

    const moduleId = await moduleTitleToId(moduleCode);

    const client = await db.connect();

    try {
        await client.query("BEGIN");
        await client.query("DELETE FROM modules_attendance WHERE module_id = $1 AND user_id = $2", [moduleId, userId]);
        await client.query("UPDATE modules SET atendees = atendees - 1 WHERE id = $1", [moduleId]);
        await client.query("COMMIT");

        return {message: "Delete attendance successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export async function getAttendance(moduleCode, userId) {
    if (await checkAttendance(userId, moduleCode)) {
        return {message: "Already attended"};
    } else {
        return {message: "Not attended"};
    }
}

export async function postReplyUpvote(replyId, userId) {
    if (await hasReplyUpvote(replyId, userId) || (await hasReplyDownvote(replyId, userId))) {
        throw new Error("Has already either upvoted or downvoted");
    }
    
    const client = await db.connect();
    try {
        await client.query("BEGIN")
        await client.query("INSERT INTO reply_upvote(user_id, reply_id) VALUES ($1, $2)", [userId, replyId]);
        await client.query("UPDATE replies SET upvote = upvote + 1 WHERE id = $1", [replyId]);
        await client.query("COMMIT");
        return {message: "Upvote successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export async function deleteReplyUpvote(replyId, userId) {
    if (!(await hasReplyUpvote(replyId, userId))) {
        throw new Error("Hasn't upvoted");
    }

    const client = await db.connect();
    try {
        await client.query("BEGIN")
        await client.query("DELETE FROM reply_upvote WHERE user_id = $1 AND reply_id = $2", [userId, replyId]);
        await client.query("UPDATE replies SET upvote = upvote - 1 WHERE id = $1", [replyId]);
        await client.query("COMMIT");
        return {message: "Delete upvote successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export async function postReplyDownvote(replyId, userId) {
    if (await hasReplyUpvote(replyId, userId) || (await hasReplyDownvote(replyId, userId))) {
        throw new Error("Has already either upvoted or downvoted");
    }

    const client = await db.connect();
    try {
        await client.query("BEGIN")
        await client.query("INSERT INTO reply_downvote(user_id, reply_id) VALUES ($1, $2)", [userId, replyId]);
        await client.query("UPDATE replies SET downvote = downvote + 1 WHERE id = $1", [replyId]);
        await client.query("COMMIT");
        return {message: "Downvote successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export async function deleteReplyDownvote(replyId, userId) {
    if (!(await hasReplyDownvote(replyId, userId))) {
        throw new Error("Hasn't downvoted");
    }

    const client = await db.connect();
    try {
        await client.query("BEGIN")
        await client.query("DELETE FROM reply_downvote WHERE user_id = $1 AND reply_id = $2", [userId, replyId]);
        await client.query("UPDATE replies SET downvote = downvote - 1 WHERE id = $1", [replyId]);
        await client.query("COMMIT");
        return {message: "Delete downvote successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export async function postThreadUpvote(threadId, userId) {
    if (await hasThreadUpvote(threadId, userId) || await hasThreadDownvote(threadId, userId)) {
        throw new Error("Has already either upvoted or downvoted");
    }

    const client = await db.connect();
    try {
        await client.query("BEGIN")
        await client.query("INSERT INTO thread_upvote(user_id, thread_id) VALUES ($1, $2)", [userId, threadId]);
        await client.query("UPDATE threads SET upvote = upvote + 1 WHERE id = $1", [threadId]);
        await client.query("COMMIT");
        return {message: "Upvote successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export async function postThreadDownvote(threadId, userId) {
    if (await hasThreadUpvote(threadId, userId) || await hasThreadDownvote(threadId, userId)) {
        throw new Error("Has already either upvoted or downvoted");
    }

    const client = await db.connect();
    try {
        await client.query("BEGIN")
        await client.query("INSERT INTO thread_downvote(user_id, thread_id) VALUES ($1, $2)", [userId, threadId]);
        await client.query("UPDATE threads SET downvote = downvote + 1 WHERE id = $1", [threadId]);
        await client.query("COMMIT");
        return {message: "Downvote successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export async function deleteThreadUpvote(threadId, userId) {
    if (!(await hasThreadUpvote(threadId, userId))) {
        throw new Error("Hasn't upvoted");
    }

    const client = await db.connect();
    try {
        await client.query("BEGIN")
        await client.query("DELETE FROM thread_upvote WHERE user_id = $1 AND thread_id = $2", [userId, threadId]);
        await client.query("UPDATE threads SET upvote = upvote - 1 WHERE id = $1", [threadId]);
        await client.query("COMMIT");
        return {message: "Delete upvote successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export async function deleteThreadDownvote(threadId, userId) {
    if (!(await hasThreadDownvote(threadId, userId))) {
        throw new Error("Hasn't downvoted");
    }

    const client = await db.connect();
    try {
        await client.query("BEGIN")
        await client.query("DELETE FROM thread_downvote WHERE user_id = $1 AND thread_id = $2", [userId, threadId]);
        await client.query("UPDATE threads SET downvote = downvote - 1 WHERE id = $1", [threadId]);
        await client.query("COMMIT");
        return {message: "Delete downvote successful"};
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(error.message);
    } finally {
        client.release();
    }
}