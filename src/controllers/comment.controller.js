import { getCommentByPostId } from "../services/comment.service.js";


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