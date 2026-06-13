import express from "express";
const authRouter = express.Router();

import { loginInputValidation, createAccountInputValidation, authenticateRequest, editAccountDetailsMiddleware } from "../middleware/auth.middleware.js";
import { loginController, createAccountController, editAccountDetailsController } from "../controllers/auth.controller.js";
authRouter.post("/login", loginInputValidation, loginController);
authRouter.post("/signup/create-account", createAccountInputValidation, createAccountController);
authRouter.post("/signup/edit-account-details", authenticateRequest, editAccountDetailsMiddleware, editAccountDetailsController);

export { authRouter };