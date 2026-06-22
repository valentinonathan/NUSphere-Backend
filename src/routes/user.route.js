import express from "express";
const userRouter = express.Router();

import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getUserDetailsController, getUserWithQueryController } from "../controllers/user.controller.js";
import { queryValidatorUser } from "../middleware/user.middleware.js";
userRouter.get("/username/:username", authenticateRequest, getUserDetailsController);
userRouter.get("/id/:userId", authenticateRequest, getUserDetailsController);
userRouter.get("/", authenticateRequest, queryValidatorUser, getUserWithQueryController);

export { userRouter };