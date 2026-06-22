import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { createEventInputValidation } from "../middleware/event.middleware.js";
import { getEventController, createEventController, getIndividualEventController } from "../controllers/event.controller.js";

const eventRouter = express.Router();

eventRouter.post("", authenticateRequest, createEventInputValidation, createEventController)
eventRouter.get("", authenticateRequest, getEventController)
eventRouter.get("/:id", authenticateRequest, getIndividualEventController)




export { eventRouter }