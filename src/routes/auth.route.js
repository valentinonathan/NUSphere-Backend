import express from "express";
const authRouter = express.Router();

import { loginInputValidation } from "../middleware/auth.middleware.js";
import { loginController } from "../controllers/auth.controller.js";
authRouter.post("/login", loginInputValidation, loginController);
authRouter.get("/", (req, res) => {res.status(200).send("hello")});

export { authRouter };