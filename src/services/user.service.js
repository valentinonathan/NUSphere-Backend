import db from "../db/index.js";

export async function getUserDetailsByUsername(username) {
    const query = await db.query("SELECT * FROM users WHERE username = $1", [username]);

    if (query.rowCount == 0) {
        throw new Error("Username not found");
    }

    const { id, first_name, last_name, nationality, year, faculty, major, residence, bio, friends } = query.rows[0];
    const userDetails = {id: id, username: username, firstName: first_name, lastName: last_name, nationality: nationality, year: year, faculty: faculty, major: major, residence: residence, bio: bio, friends: friends};

    return userDetails;
}

export async function getUserDetailsByUserId(userId) {
    const query = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (query.rowCount == 0) {
        throw new Error("UserId not found");
    }

    const { id, username, first_name, last_name, nationality, year, faculty, major, residence, bio, friends } = query.rows[0];
    const userDetails = {id: id, username: username, firstName: first_name, lastName: last_name, nationality: nationality, year: year, faculty: faculty, major: major, residence: residence, bio: bio, friends: friends};

    return userDetails;
}