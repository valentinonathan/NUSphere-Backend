import db from "../db/index.js"

export async function getProductCards() {
    const result = await db.query(`
        SELECT
            l.id,
            l.image_url,
            l.title,
            l.price,
            u.username AS seller_username,
            c.name AS category_name
        FROM listings l
        JOIN users u
            ON l.seller_id = u.id
        JOIN categories c
            ON l.category_id = c.id
        ORDER BY l.created_at ASC
    `);

    return { data: result.rows };
}

export async function getListing(listing_id) {
    const result = await db.query(
        `
        SELECT
            l.*,
            u.username AS seller_username,
            c.name AS category_name
        FROM listings l
        JOIN users u
            ON l.seller_id = u.id
        JOIN categories c
            ON l.category_id = c.id
        WHERE l.id = $1
        `,
        [listing_id]
    );

    if (result.rowCount === 0) {
        return { message: "Listing does not exist" };
    }

    return { data: result.rows[0] };
}

export async function createListing(seller_id, title, description, price, image_url, category_id) {
    const result = await db.query(
        "INSERT INTO listings (seller_id, title, description, price, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [seller_id, title, description, price, image_url, category_id]
    );
    return { data: true }
}

export async function deleteListing(listingId, sellerId) {
    const result = await db.query(
        `
        DELETE FROM listings
        WHERE id = $1
          AND seller_id = $2
          AND status IN ('Available', 'Cancelled')
        RETURNING *
        `,
        [listingId, sellerId]
    );

    if (result.rowCount === 0) {
        return {
            message:
                "Listing does not exist, you are not the owner, or the listing cannot be deleted."
        };
    }

    return {
        data: result.rows[0]
    };
}

export async function getCategories() {
    const result = await db.query(`
        SELECT id, name
        FROM categories
        ORDER BY name ASC
    `);

    return { data: result.rows };
}

export async function getMyListings(sellerId) {
    const result = await db.query(
        `
        SELECT
            l.*,
            u.username AS seller_username,
            c.name AS category_name
        FROM listings l
        JOIN users u
            ON l.seller_id = u.id
        JOIN categories c
            ON l.category_id = c.id
        WHERE l.seller_id = $1
        `,
        [sellerId]
    );


    return { data: result.rows };
}

export async function createMarketConversation(conversation_id, listing_id) {
    const result = await db.query(
        `
        INSERT INTO market_conversations (
            conversation_id,
            listing_id
        )
        VALUES ($1, $2)
        ON CONFLICT (conversation_id, listing_id)
        DO NOTHING
        RETURNING *
        `,
        [conversation_id, listing_id]
    );

    if (result.rowCount === 0) {
        return {
            message: "Market conversation already exists"
        };
    }

    return {
        data: result.rows[0]
    };
}


export async function getMarketConversationByListingId(listing_id) {
    const result = await db.query(
        `
        SELECT
            mc.conversation_id,
            u.id AS buyer_id,
            u.username AS buyer_username
        FROM market_conversations mc
        JOIN conversations c
            ON mc.conversation_id = c.id
        JOIN listings l
            ON mc.listing_id = l.id
        JOIN users u
            ON u.id = CASE
                WHEN c.user1_id = l.seller_id THEN c.user2_id
                ELSE c.user1_id
            END
        WHERE mc.listing_id = $1
        ORDER BY mc.created_at DESC
        `,
        [listing_id]
    );

    return { data: result.rows };
}