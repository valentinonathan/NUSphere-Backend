import { friendRequest, friendRequestStatus, unfriendRequest, unsendFriendRequest } from "../services/friendRequests.services.js";


export async function friendRequestController(req, res, next) {
    try {
        const senderId = req.userId;
        const receiverId = req.params.receiverId;
        const action = req.body.action;

        if (action == "Request") {
            const result = await friendRequest(senderId, receiverId);
            res.status(200).json(result);
        }
        if (action == "Unsend Request") {
            const result = await unsendFriendRequest(senderId, receiverId);
            res.status(200).json(result);
        }
        if (action == "Unfriend") {
            const result = await unfriendRequest(senderId, receiverId);
            res.status(200).json(result);
        }
    } catch (error) {
        if (error.message == "receiverId does not exist" || error.message == "Request failed, already friends" || error.message == "Cannot friend yourself") {
            res.status(400).json({message: error.message});
        } else {
            console.error("friendRequestController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function friendRequestStatusController(req, res, next) {
    try {
        const senderId = req.userId;
        const receiverId = req.params.receiverId;

        const result = await friendRequestStatus(senderId, receiverId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "receiverId does not exist") {
            res.status(400).json({message: error.message});
        } else {
            console.error("friendRequestStatusController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}