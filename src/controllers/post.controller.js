import { getPostsByUserId, getPostsByUsername } from "../services/post.service.js";

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