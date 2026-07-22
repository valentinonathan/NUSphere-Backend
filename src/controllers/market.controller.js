import { getProductCards, getListing, createListing } from "../services/market.service.js";
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
        const file = req.file;
        // const caption = req.body.caption ? req.body.caption.trim() : null;

        if (!file) {
            res.status(400).json({message: "Image file is required"});
        }

        const imageUrl = await uploadImagePost(file.buffer, file.mimetype, file.originalname);
        const seller_id = userId;
        const title = req.body?.title;
        const description = req.body?.description ?? null;
        const price = req.body?.price;

        if (!seller_id || !title || !description || !price) {
            throw new Error("One of listing's parameters is undefined")
        }

        const result = await createListing(seller_id, title, description, price, imageUrl)

        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


