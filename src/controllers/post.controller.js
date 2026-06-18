import { getPostsByUserId, getPostsByUsername, getPostById, likePostById, unlikePostById, hasLiked } from "../services/post.service.js";

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
            res.status(500).json({message: error.message});
        }
    }
}