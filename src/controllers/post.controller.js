import { getPostsByUserId, getPostsByUsername, getPostById, likePostById, unlikePostById, hasLiked, createPost, feedRequest, updateNewPostUser } from "../services/post.service.js";
import { uploadImagePost } from "../db/cloudflare-bucket.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function getPostsController(req, res, next) {
    try {
        const username = req.params?.username;
        const userId = req.params?.userId;
        let result = null;

        if (username === undefined) {
            result = await getPostsByUserId(userId)
        } else {
            result = await getPostsByUsername(username);
        }

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "UserId does not exist" || error.message == "Username does not exist") {
            res.status(404).json({message: error.message});
        } else {
            console.error("getPostsController: " + error.message, error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function getPostByIdController(req, res, next) {
    try {
        const postId = req.params.postId;

        const result = await getPostById(postId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Post not found") {
            res.status(404).json({message: error.message});
        } else {
            console.error("getPostByIdController: " + error.message, error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function likePostByIdController(req, res, next) {
    try {
        const postId = req.params.postId;
        const userId = req.userId;
        const like = req.body.like;

        if (like) {
            await likePostById(userId, postId);
            res.status(200).json({message: "Post successfully liked"});
        } else {
            await unlikePostById(userId, postId);
            res.status(200).json({message: "Post successfully unliked"});
        }
    } catch (error) {
        if (error.message == "Post Id does not exist") {
            res.status(404).json({message: error.message});
        } else {
            console.error("likePostByIdController: " + error.message, error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function hasLikedController(req, res, next) {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        const result = await hasLiked(userId, postId);

        res.status(200).json({hasLiked: result});
    } catch (error) {
        if (error.message == "Post Id does not exist") {
            res.status(404).json({message: error.message});
        } else {
            console.error("hasLikedController: " + error.message, error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function createPostController(req, res, next) {
    try {
        const userId = req.userId;
        const file = req.file;
        const caption = req.body.caption ? req.body.caption.trim() : null;

        // Upload image to Cloudflare R2
        const imageUrl = await uploadImagePost(file.buffer, file.mimetype, file.originalname);

        // // Just put the new code here and don't delete any of the lines above
        // // Save file locally to project directory
        // const __filename = fileURLToPath(import.meta.url);
        // const __dirname = path.dirname(__filename);
        // const uploadDir = path.join(__dirname, '../../uploads/post-images');

        // // Create uploads directory if it doesn't exist
        // if (!fs.existsSync(uploadDir)) {
        //     fs.mkdirSync(uploadDir, { recursive: true });
        // }

        // // Save file locally
        // const filename = `${Date.now()}-${file.originalname}`;
        // const filepath = path.join(uploadDir, filename);
        // fs.writeFileSync(filepath, file.buffer);

        // Create post with the image URL
        const result = await createPost(userId, imageUrl, caption);

        // Set hasNewPost field in table users to true
        await updateNewPostUser(userId, result.postId);

        res.status(201).json({message: "Post created successfully", postId: result.postId, post: result.post});
    } catch (error) {
        console.error("createPostController: " + error.message, error);
        res.status(500).json({message: error.message});
    }
}

export async function feedRequestController(req, res, next) {
    try {
        const page = req.query.page;
        const userId = req.userId;

        const result = await feedRequest(userId, page);

        res.status(200).json(result);
    } catch (error) {
        console.error("feedRequestController: ", error);
        res.status(500).json({message: error.message});
    }
}

