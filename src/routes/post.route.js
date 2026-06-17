import express from "express";
const postRouter = express();

import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getPostsController, getPostByIdController } from "../controllers/post.controller.js";
postRouter.get("/username/:username", authenticateRequest, getPostsController);
postRouter.get("/id/:userId", authenticateRequest, getPostsController);
postRouter.get("/:postId", authenticateRequest, getPostByIdController)

export { postRouter }