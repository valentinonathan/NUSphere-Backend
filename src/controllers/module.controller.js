import { getModuleThreadsByCategory, getModuleThreadsGeneral, getMyModule, getThreadReplies } from "../services/module.service.js";

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

export async function getModuleThreadsController(req, res, next) {
    try {
        const category = req.query?.category;
        const moduleCode = req.params.moduleCode;
        let results = {};

        if (category === undefined) {
            results = await getModuleThreadsGeneral(moduleCode);
        } else {
            results = await getModuleThreadsByCategory(category, moduleCode);
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

        const results = await getThreadReplies(threadId);

        res.status(200).json(results);
    } catch (Error) {
        console.error("getThreadRepliesController: ", error);
        res.status(500).json({message: error.message});
    }
}