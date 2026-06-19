import { friendRequest, friendRequestStatus, unfriendRequest, unsendFriendRequest, getAllIncomingFriendRequests, rejectFriendRequest } from "../services/friendRequests.services.js";


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

export async function getAllIncomingFriendRequestsController(req, res, next) {
    try {
        const userId = req.userId;

        const result = await getAllIncomingFriendRequests(userId);

        res.status(200).json(result);
    } catch (error) {
        console.error("getAllIncomingFriendRequestsController: ", error);
        res.status(500).json({message: error.message});
    }
}

export async function rejectFriendRequestController(req, res, next) {
    try {
        const receiverId = req.userId;
        const senderId = req.params.senderId;

        const result = await rejectFriendRequest(receiverId, senderId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "senderId does not exist" || error.message == "Cannot reject your own request" || error.message == "Friend request not found") {
            res.status(400).json({message: error.message});
        } else {
            console.error("rejectFriendRequestController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}