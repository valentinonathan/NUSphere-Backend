// routes/conversation.route.js
import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import {
  getOrCreateConversationController,
  getConversationsController,
  getConversationMessagesController,
} from "../controllers/conversation.controller.js";

const conversationRouter = express.Router();

conversationRouter.post(
  "/direct",
  authenticateRequest,
  getOrCreateConversationController
);

conversationRouter.get(
  "/",
  authenticateRequest,
  getConversationsController
);

conversationRouter.get(
  "/:conversationId/messages",
  authenticateRequest,
  getConversationMessagesController
);

export { conversationRouter };