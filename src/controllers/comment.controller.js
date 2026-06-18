import { getCommentByPostId, postCommentByPostId } from "../services/comment.service.js";


export async function getCommentsByPostIdController(req, res, next) {
    try {
        const postId = req.params.postId;

        const results = await getCommentByPostId(postId);

        res.status(200).json(results);
    } catch (error) {
        if (error.message == "Post Id does not exist") {
            res.status(404).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
}

export async function postCommentByPostIdController(req, res, next) {
    try {
        const comment = req.body.comment;
        const userId = req.userId;
        const postId = req.params.postId;

        const result = await postCommentByPostId(postId, userId, comment);

        res.status(200).json({message: "Comment successfully posted", comment: result});
    } catch (error) {
        if (error.message == "Post Id does not exist") {
            return res.status(404).json({message: error.message});
        } else {
            return res.status(500).json({message: error.message});
        }
    }
}