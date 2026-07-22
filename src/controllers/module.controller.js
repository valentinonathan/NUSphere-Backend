import { deleteAttendance, deleteReplyDownvote, deleteReplyUpvote, deleteThreadDownvote, deleteThreadUpvote, getAttendance, getFeedModule, getModuleThreadsByCategory, getModuleThreadsGeneral, getMyModule, getThreadReplies, postAttendance, postReplyDownvote, postReplyUpvote, postThreadDownvote, postThreadReplies, postThreadUpvote } from "../services/module.service.js";

export async function getMyModuleController(req, res, next) {
    try {
        const userId = req.userId;

        const result = await getMyModule(userId);

        res.status(200).json(result);
    } catch (error) {
        console.error("getMyModuleController: ", error);
        res.status(500).json({message: error.message});
    }
}

export async function getFeedModuleController(req, res, next) {
    try {
        const userId = req.userId;

        const result = await getFeedModule(userId);

        res.status(200).json(result);
    } catch (error) {
        console.error("getFeedModuleController: ", error);
        res.status(500).json({message: error.message});
    }
}

export async function getModuleThreadsController(req, res, next) {
    try {
        const category = req.query?.category;
        const moduleCode = req.params.moduleCode;
        const userId = req.userId;
        let results = {};

        if (category === undefined) {
            results = await getModuleThreadsGeneral(moduleCode);
        } else {
            results = await getModuleThreadsByCategory(category, moduleCode, userId);
        }

        res.status(200).json(results);
    } catch (error) {
        console.error("getModuleThreadController: ", error);
        res.status(500).json({message: error.message});
    }
}

export async function getThreadRepliesController(req, res, next) {
    try {
        const moduleCode = req.params.moduleCode;
        const threadId = req.params.threadId;
        const userId = req.userId;

        const results = await getThreadReplies(threadId, userId);

        res.status(200).json(results);
    } catch (Error) {
        console.error("getThreadRepliesController: ", error);
        res.status(500).json({message: error.message});
    }
}

export async function postThreadRepliesController(req, res, next) {
    try {
        const userId = req.userId;
        const moduleCode = req.params.moduleCode;
        const threadId = req.params.threadId;
        const reply = req.body.reply;
        const parentReplyId = req.body.parentReplyId;

        const result = await postThreadReplies(userId, moduleCode, threadId, reply, parentReplyId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "UserId does not exist") {
            console.error("postThreadRepliesController", error);
            res.status(404).json({message: error.message});
        } else {
            console.error("postThreadRepliesController", error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function postAttendanceController(req, res, next) {
    try {
        const moduleCode = req.params.moduleCode;
        const userId = req.userId;

        const result = await postAttendance(moduleCode, userId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Already attended") {
            return res.status(400).json({message: error.message});
        } else {
            console.error("postAttendanceController:", error);
            return res.status(500).json({message: error.message});
        }
    }
}

export async function deleteAttendanceController(req, res, next) {
    try {
        const moduleCode = req.params.moduleCode;
        const userId = req.userId;

        const result = await deleteAttendance(moduleCode, userId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Not attended") {
            return res.status(400).json({message: error.message});
        } else {
            console.error("postAttendanceController:", error);
            return res.status(500).json({message: error.message});
        }
    }
}

export async function getAttendanceController(req, res, next) {
    try {
        const moduleCode = req.params.moduleCode;
        const userId = req.userId;

        const result = await getAttendance(moduleCode, userId);

        return res.status(200).json(result);
    } catch (error) {
        console.error("getAttendanceController: ", error);
        return res.status(500).json({message: error.message});
    }
}

export async function postReplyUpvoteController(req, res, next) {
    try {
        const replyId = req.params.replyId;
        const userId = req.userId;

        const result = await postReplyUpvote(replyId, userId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Has already either upvoted or downvoted") {
            res.status(400).json({message: error.message});
        } else {
            console.error("postReplyUpvoteController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function deleteReplyUpvoteController(req, res, next) {
    try {
        const replyId = req.params.replyId;
        const userId = req.userId;

        const result = await deleteReplyUpvote(replyId, userId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Hasn't upvoted") {
            res.status(400).json({message: error.message});
        } else {
            console.error("deleteReplyUpvoteController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function postReplyDownvoteController(req, res, next) {
    try {
        const replyId = req.params.replyId;
        const userId = req.userId;

        const result = await postReplyDownvote(replyId, userId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Has already either upvoted or downvoted") {
            res.status(400).json({message: error.message});
        } else {
            console.error("postReplyDownvoteController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function deleteReplyDownvoteController(req, res, next) {
    try {
        const replyId = req.params.replyId;
        const userId = req.userId;

        const result = await deleteReplyDownvote(replyId, userId);

        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Hasn't downvoted") {
            res.status(400).json({message: error.message});
        } else {
            console.error("deleteReplyDownvoteController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function postThreadUpvoteController(req, res, next) {
    try {
        const threadId = req.params.threadId;
        const userId = req.userId;

        const result  = await postThreadUpvote(threadId, userId);
        
        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Has already either upvoted or downvoted") {
            res.status(400).json({message: error.message});
        } else {
            console.error("postThreadUpvoteController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function postThreadDownvoteController(req, res, next) {
    try {
        const threadId = req.params.threadId;
        const userId = req.userId;

        const result  = await postThreadDownvote(threadId, userId);
        
        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Has already either upvoted or downvoted") {
            res.status(400).json({message: error.message});
        } else {
            console.error("postThreadDownvoteController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function deleteThreadUpvoteController(req, res, next) {
    try {
        const threadId = req.params.threadId;
        const userId = req.userId;

        const result  = await deleteThreadUpvote(threadId, userId);
        
        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Hasn't upvoted") {
            res.status(400).json({message: error.message});
        } else {
            console.error("deleteThreadUpvoteController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}

export async function deleteThreadDownvoteController(req, res, next) {
    try {
        const threadId = req.params.threadId;
        const userId = req.userId;

        const result  = await deleteThreadDownvote(threadId, userId);
        
        res.status(200).json(result);
    } catch (error) {
        if (error.message == "Hasn't downvoted") {
            res.status(400).json({message: error.message});
        } else {
            console.error("deleteThreadDownvoteController: ", error);
            res.status(500).json({message: error.message});
        }
    }
}