import { isExistModule, isExistReply, isExistThread } from "../utils/module.utils.js";
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed (jpeg, png, webp, gif)"));
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

export async function createThreadsValidator(req, res, next) {
    const body = req.body?.body;
    const title = req.body?.title;
    const category = req.body?.category;
    const week = req.body?.week;
    const moduleCode = req.body?.moduleCode;

    if (title === undefined || category === undefined || week === undefined || moduleCode === undefined || body === undefined) {
        return res.status(400).json({message: "Title, category, moduleCode, body, and week are required"});
    }

    if (!(await isExistModule(moduleCode))) {
        return res.status(400).json({message: "Module does not exist"});
    }

    if (title.length == 0) {
        return res.status(400).json({message: "Title is empty"});
    }

    if (title.length > 300) {
        return res.status(400).json({message: "Title must not exceed 300 characters"});
    }

    if (body.length > 40000) {
        return res.status(400).json({message: "Body must not exceed 40000 characters"});
    }

    if (week.length == 0 || category.length == 0) {
        return res.status(400).json({message: "Either week or category is empty"});   
    }

    if (week != "0" && week != "1" && week != "2" && week != "3" && week != "4" && week != "5" && week != "6" && week != "7" && week != "8" && week != "9" && week != "10" && week != "11" && week != "12" && week != "13") {
        return res.status(400).json({message: "Week should be between 0 to 13"});
    }

    if (category != "General" && category != "Lecture" && category != "Tutorial" && category != "Exam") {
        return res.status(400).json({message: "Category should be either General, Lecture, Tutorail, or Exam"});
    }

    next();
}

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

