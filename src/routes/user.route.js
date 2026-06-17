import express from "express";
const userRouter = express.Router();

import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getUserDetailsController } from "../controllers/user.controller.js";
userRouter.get("/username/:username", authenticateRequest, getUserDetailsController);
userRouter.get("/id/:userId", authenticateRequest, getUserDetailsController);

export { userRouter };