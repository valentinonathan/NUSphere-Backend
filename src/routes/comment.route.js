import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getCommentsByPostIdController } from "../controllers/comment.controller.js";
const commentRouter = express.Router();

commentRouter.get("/:postId", authenticateRequest, getCommentsByPostIdController);

export { commentRouter }