import { isExistModule, isExistReply, isExistThread } from "../utils/module.utils.js";

export function getModuleThreadsValidator(req, res, next) {
    if (req.params?.moduleCode === undefined || !isExistModule(req.params.moduleCode)) {
        return res.status(404).json({message: "moduleCode does not exist"});
    }

    if (req.query?.category === undefined) {
        return next();
    } 

    if (req.query.category == "Lecture" || req.query.category == "Tutorial" || req.query.category == "Assignment" || req.query.category == "Exam") {
        return next();
    } else {
        return res.status(400).json({message: "Bad query category format"});
    }
}

export async function getThreadRepliesValidator(req, res, next) {
    const moduleCode = req.params?.moduleCode;
    const threadId = req.params?.threadId;

    if (moduleCode === undefined || threadId === undefined) {
        return res.status(400).json({message: "Either moduleCode or threadId params are missing"});
    }

    if (!(await isExistModule(moduleCode))) {
        return res.status(404).json({message: "Module code not found"});
    }
    if (!(await isExistThread(threadId))) {
        return res.status(404).json({message: "Thread ID not found"});
    }

    next();
}

export async function postThreadRepliesValidator(req, res, next) {
    const moduleCode = req.params?.moduleCode;
    const threadId = req.params?.threadId;
    const reply = req?.body?.reply;
    const parentReplyId = req?.body?.parentReplyId;

    if (reply === undefined || parentReplyId === undefined) {
        return res.status(400).json({message: "Either reply or parentReplyId is missing in the body"});
    }

    if (typeof reply != "string") {
        return res.status(400).json({message: "Reply body must be of type string"});
    }

    if (typeof parentReplyId != "number") {
        return res.status(400).json({message: "Parent reply Id must be of type integer"});
    }

    if (parentReplyId > -1 && !(await isExistReply(parentReplyId))) {
        return res.status(404).json({message: "Parent reply Id is not found"});
    }

    if (moduleCode === undefined || threadId === undefined) {
        return res.status(400).json({message: "Either moduleCode or threadId params are missing"});
    }

    if (!(await isExistModule(moduleCode))) {
        return res.status(404).json({message: "Module code not found"});
    }
    if (!(await isExistThread(threadId))) {
        return res.status(404).json({message: "Thread ID not found"});
    }

    next();
}

export async function postAttendanceValidator(req, res, next) {
    const moduleCode = req.params?.moduleCode;

    if (moduleCode == undefined) {
        return res.status(400).json({message: "ModuleCode is missing"});
    }
    if (!(await isExistModule(moduleCode))) {
        return res.status(404).json({message: "Module code not found"});
    }

    next();
}

export async function postReplyUpvoteValidator(req, res, next) {
    const replyId = req.params?.replyId;

    if (replyId === undefined) {
        return res.status(400).json({message: "Reply Id is missing"});
    }

    if (!(await isExistReply(replyId))) {
        return res.status(404).json({message: "Reply Id not found"});
    }

    next();
}

export async function threadVoteValidator(req, res, next) {
    const threadId = req.params?.threadId;

    if (threadId === undefined) {
        return res.status(400).json({message: "Thread Id is missing"});
    }

    if (!(await isExistThread(threadId))) {
        return res.status(404).json({message: "Thread Id not found"});
    }

    next();
}

