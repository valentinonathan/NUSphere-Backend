import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { createEventAttendanceController, getEventAttendanceController } from "../controllers/event.attendance.controller.js";

const eventAttendanceRouter = express.Router();

eventAttendanceRouter.get("/:id/get", authenticateRequest, getEventAttendanceController)
eventAttendanceRouter.post("/:id/create", authenticateRequest, createEventAttendanceController)

export {eventAttendanceRouter}