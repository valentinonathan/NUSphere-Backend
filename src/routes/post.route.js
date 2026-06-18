import express from "express";
const postRouter = express();

import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getPostsController, getPostByIdController, likePostByIdController, hasLikedController } from "../controllers/post.controller.js";
import { likePostValidator } from "../middleware/post.middleware.js";
postRouter.get("/username/:username", authenticateRequest, getPostsController);
postRouter.get("/id/:userId", authenticateRequest, getPostsController);
postRouter.get("/:postId", authenticateRequest, getPostByIdController);
postRouter.post("/:postId/likes", authenticateRequest, likePostValidator, likePostByIdController);
postRouter.get("/:postId/likes", authenticateRequest, hasLikedController);

export { postRouter }