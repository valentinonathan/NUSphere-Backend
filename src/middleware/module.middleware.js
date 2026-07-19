import { isExistModule, isExistThread } from "../utils/module.utils.js";

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

export function getThreadRepliesValidator(req, res, next) {
    const moduleCode = req.params?.moduleCode;
    const threadId = req.params?.threadId;

    if (moduleCode === undefined || threadId === undefined) {
        return res.status(400).json({message: "Either moduleCode or threadId params are missing"});
    }

    if (!isExistModule(moduleCode)) {
        return res.status(404).json({message: "Module code not found"});
    }
    if (!isExistThread(threadId)) {
        return res.status(404).json({message: "Thread ID not found"});
    }

    next();
}