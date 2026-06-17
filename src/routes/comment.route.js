import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getCommentsByPostIdController } from "../controllers/comment.controller.js";
import { postCommentValidator } from "../middleware/comment.middleware.js";
import { postCommentByPostIdController } from "../controllers/comment.controller.js";
const commentRouter = express.Router();

commentRouter.get("/:postId", authenticateRequest, getCommentsByPostIdController);
commentRouter.post("/:postId", authenticateRequest, postCommentValidator, postCommentByPostIdController);

export { commentRouter }