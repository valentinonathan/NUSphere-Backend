import { getProductCards, getListing, createListing, getCategories, getMyListings, createMarketConversation } from "../services/market.service.js";
import { uploadImagePost } from "../db/cloudflare-bucket.js";

export async function getProductCardController(req, res, next) {
    try {
        const result = await getProductCards();

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}

export async function getListingController(req, res, next) {
    try {
        const result = await getListing(req.params.id);

        res.status(200).json(result)

    } catch (error) {
        res.status(400).json({message: error.message});

    }
}

export async function createListingController(req, res, next) {
    try {
        const userId = req.userId;
        const conversationId = req.body?.conversationId;
        // const caption = req.body.caption ? req.body.caption.trim() : null;

        if (!file) {
            res.status(400).json({message: "Image file is required"});
        }

        const imageUrl = await uploadImagePost(file.buffer, file.mimetype, file.originalname);
        const seller_id = userId;
        const title = req.body?.title;
        const description = req.body?.description ?? null;
        const price = req.body?.price;
        const category_id = req.body?.category_id

        if (!seller_id || !title || !description || !price || !category_id) {
            throw new Error("One of listing's parameters is undefined")
        }

        const result = await createListing(seller_id, title, description, price, imageUrl, category_id)

        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export async function createMarketConversationController(req, res) {
    try {
        const { conversationId, listingId } = req.body;

        if (!conversationId || !listingId) {
            return res.status(400).json({
                message: "conversation_id and listing_id are required"
            });
        }

        const result = await createMarketConversation(
            Number(conversationId),
            Number(listingId)
        );

        return res.status(201).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function getCategoriesController(req, res, next) {
    try {
        const result = await getCategories();

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function getMyListingsController(req, res, next) {
    try {
        const result = await getMyListings(req.userId);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


