import db from "../db/index.js";

export async function getEvent() {
    // const result = await db.query(`
    // SELECT *
    // FROM events
    // WHERE start_time >= NOW()
    // ORDER BY start_time ASC
    // `);

    const result = await db.query(`
    SELECT
    e.id,
    u.username,
    e.title,
    e.description,
    e.location,
    e.start_time
    FROM events e
    JOIN users u
        ON e.user_id = u.id
    WHERE e.start_time >= NOW()
    ORDER BY e.start_time ASC`);

    return result.rows;

}

export async function createEvent(username, title, description, location, start_time) {
    const result = await db.query("SELECT id from users WHERE username = $1", [username]);

    if (result.rowCount === 0) {
        throw new Error("User not found");
    }

    const user_id = result.rows[0].id;

    const query = await db.query("INSERT into events(user_id, title, description, location, start_time) VALUES ($1, $2, $3, $4, $5)", [user_id, title, description, location, start_time]);

    if (query.rowCount != 1) {
        throw new Error("Update unsuccessful!");
    }
}