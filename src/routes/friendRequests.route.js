import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { friendRequestController, friendRequestStatusController } from "../controllers/friendRequests.controllers.js";
import { friendRequestValidator } from "../middleware/friendRequests.middleware.js";
const friendRequestsRouter = express.Router();

friendRequestsRouter.post("/:receiverId", authenticateRequest, friendRequestValidator, friendRequestController);
friendRequestsRouter.get("/:receiverId", authenticateRequest, friendRequestStatusController);

export { friendRequestsRouter }