import express from "express";
const userRouter = express.Router();

import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getUserDetailsByUsernameController } from "../controllers/user.controller.js";
userRouter.get("/username/:username", authenticateRequest, getUserDetailsByUsernameController);
userRouter.get("/id/:userId", authenticateRequest, getUserDetailsByUsernameController);

export { userRouter };