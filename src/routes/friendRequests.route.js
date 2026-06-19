import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { friendRequestController, friendRequestStatusController } from "../controllers/friendRequests.controllers.js";
const friendRequestsRouter = express.Router();

friendRequestsRouter.post("/:receiverId", authenticateRequest, friendRequestController);
friendRequestsRouter.get("/:receiverId", authenticateRequest, friendRequestStatusController);

export { friendRequestsRouter }