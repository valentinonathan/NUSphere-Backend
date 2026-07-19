import express from "express"
const moduleRouter = express();

import { authenticateRequest } from "../middleware/auth.middleware.js"
import { getModuleThreadsController, getMyModuleController, getThreadRepliesController } from "../controllers/module.controller.js"
import { getModuleThreadsValidator, getThreadRepliesValidator } from "../middleware/module.middleware.js";
moduleRouter.get("/my", authenticateRequest, getMyModuleController);
moduleRouter.get("/:moduleCode/threads", authenticateRequest, getModuleThreadsValidator, getModuleThreadsController);
moduleRouter.get("/:moduleCode/threads/:threadId/replies", authenticateRequest, getThreadRepliesValidator, getThreadRepliesController);

export { moduleRouter }