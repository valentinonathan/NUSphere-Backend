// routes/conversation.route.js
import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getOrCreateConversationController } from "../controllers/conversation.controller.js";

const conversationsRouter = express.Router();



conversationsRouter.post("/", authenticateRequest, getOrCreateConversationController);

export {conversationsRouter};