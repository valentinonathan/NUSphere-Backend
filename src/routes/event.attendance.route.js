import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { createEventAttendanceController, deleteEventAttendanceController, getEventAttendanceController } from "../controllers/event.attendance.controller.js";

const eventAttendanceRouter = express.Router();

eventAttendanceRouter.get("/:id/attendance", authenticateRequest, getEventAttendanceController)
eventAttendanceRouter.post("/:id/attendance", authenticateRequest, createEventAttendanceController)
eventAttendanceRouter.delete("/:id/attendance", authenticateRequest, deleteEventAttendanceController)

export {eventAttendanceRouter}