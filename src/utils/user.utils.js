import db from "../db/index.js"

export async function getUsernameByUserId(userId) {
    const query = await db.query("SELECT username FROM users WHERE id = $1", [userId]);

    if (query.rowCount == 0) {
        return "";
    } 

    return query.rows[0].username;
}

export async function getUserIdByUsername(userId) {
    const query = await db.query("SELECT id FROM users WHERE username = $1", [username]);

    if (query.rowCount == 0) {
        return "";
    } 

    return query.rows[0].id;
}

export async function userIdExists(userId) {
    const query = await db.query("SELECT username FROM users WHERE id = $1", [userId]);

    if (query.rowCount == 0) {
        return false;
    } else {
        return true;
    }
}

export async function usernameExists(username) {
    const query = await db.query("SELECT username FROM users WHERE username = $1", [username]);

    if (query.rowCount == 0) {
        return false;
    } else {
        return true;
    }
}