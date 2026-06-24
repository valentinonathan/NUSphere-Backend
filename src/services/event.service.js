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
    e.start_time,
    e.url
    FROM events e
    JOIN users u
        ON e.user_id = u.id
    WHERE e.start_time >= NOW()
    ORDER BY e.start_time ASC`);

    return result.rows;

}

export async function getIndividualEvent(eventId) {
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
    e.start_time,
    e.url
    FROM events e
    JOIN users u
        ON e.user_id = u.id
    WHERE e.start_time >= NOW()
    AND e.id=$1
    ORDER BY e.start_time ASC`, [eventId]);

    return result.rows[0];

}

export async function createEvent(user_id, title, description, location, start_time, url) {
    const query = await db.query(
        "INSERT into events(user_id, title, description, location, start_time, url) VALUES ($1, $2, $3, $4, $5, $6)",
        [user_id, title, description, location, start_time, url]
    );

    if (query.rowCount != 1) {
        throw new Error("Update unsuccessful!");
    }
}