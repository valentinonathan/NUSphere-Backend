import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { createEventInputValidation } from "../middleware/event.middleware.js";
import { getEventController, createEventController } from "../controllers/event.controller.js";

const eventRouter = express.Router();

eventRouter.post("/create", authenticateRequest, createEventInputValidation, createEventController)
eventRouter.get("/get", authenticateRequest, getEventController)



export { eventRouter }