import db from "../db/index.js";
import { eventIdExists } from "../utils/event.utils.js";
import { userIdExists } from "../utils/user.utils.js";

export async function getEventAttendance(eventId) {
    if (!eventIdExists(eventId)) {
        throw new Error("EventId does not exist")
    }
    
    const query = await db.query(`
        SELECT
            u.id,
            u.username
        FROM events_attendance ea
        JOIN users u
            ON ea.user_id = u.id
        WHERE ea.event_id = $1;
    `, [eventId])

    return {rows: query.rows, count: query.rowCount}
}

export async function createEventAttendance(userId, eventId) {
    const userExists = await userIdExists(userId);
    if (!userExists) {
        throw new Error("UserId does not exist");
    }

    const eventExists = await eventIdExists(eventId);
    if (!eventExists) {
        throw new Error("EventId does not exist");
    }

    const query = await db.query(`
        INSERT INTO events_attendance(event_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (event_id, user_id)
        DO NOTHING;
        `, [eventId, userId])
    
    if (query.rowCount == 0) {
        throw new Error("User already attend the event")
    }
    
}