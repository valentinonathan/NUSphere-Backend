import express from "express";
const postRouter = express();

import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getPostsController } from "../controllers/post.controller.js";
postRouter.get("/username/:username", authenticateRequest, getPostsController);
postRouter.get("/id/:userId", authenticateRequest, getPostsController);

export { postRouter }