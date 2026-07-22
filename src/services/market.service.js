import db from "../db/index.js"

export async function getProductCards() {
    const result = await db.query("SELECT id, image_url, title from listings ORDER BY created_at ASC");
    return {data : result.rows}
}

export async function getListing(listing_id) {
    const result = await db.query("SELECT * FROM listings WHERE id = $1", [listing_id])
    if (result.rowCount == 0) {
        return {message : "Listing does not exist"}
    } else {
        return {data : result.rows[0]}
    }
}

export async function createListing(seller_id, title, description, price, image_url) {
    const result = await db.query(
        "INSERT INTO listings (seller_id, title, description, price, image_url) VALUES ($1, $2, $3, $4, $5)",
        [seller_id, title, description, price, image_url]
    );
    return {data : true}
}