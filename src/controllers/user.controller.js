import { getUserDetailsByUsername, getUserDetailsByUserId } from "../services/user.service.js";

export async function getUserDetailsByUsernameController(req, res, next) {
    try {
        const username = req.params?.username;
        const userId = req.params?.userId;
        let userDetails = null;

        if (username === undefined) {
            userDetails = await getUserDetailsByUserId(userId);
        } else {
            userDetails = await getUserDetailsByUsername(username);
        }

        res.status(200).json(userDetails);
    } catch (error) {
        if (error.message == "Username not found" || error.message == "UserId not found") {
            res.status(404).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
}