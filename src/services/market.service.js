import db from "../db/index.js"

export async function getProductCards() {
    const result = await db.query(`
        SELECT
            listings.id,
            listings.image_url,
            listings.title,
            users.username AS seller_username
        FROM listings
        JOIN users
            ON listings.seller_id = users.id
        ORDER BY listings.created_at ASC
    `);

    return { data: result.rows };
}

export async function getListing(listing_id) {
    const result = await db.query(`SELECT
    l.*,
    u.username AS seller_username
FROM listings l
JOIN users u
    ON l.seller_id = u.id
WHERE l.id = $1`, [listing_id])
    if (result.rowCount == 0) {
        return { message: "Listing does not exist" }
    } else {
        return { data: result.rows[0] }
    }
}

export async function createListing(seller_id, title, description, price, image_url) {
    const result = await db.query(
        "INSERT INTO listings (seller_id, title, description, price, image_url) VALUES ($1, $2, $3, $4, $5)",
        [seller_id, title, description, price, image_url]
    );
    return { data: true }
}