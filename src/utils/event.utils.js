import db from "../db/index.js"

export async function eventIdExists(eventId) {
    const query = await db.query("SELECT id FROM events WHERE id = $1", [eventId]);

    if (query.rowCount == 0) {
        return false;
    } else {
        return true;
    }
}