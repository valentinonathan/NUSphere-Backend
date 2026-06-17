import { getEventAttendance, createEventAttendance } from "../services/event.attendance.service.js";

export async function getEventAttendanceController(req, res, next) {
    try {
        const id = req.params?.id;

        if (id == undefined) {
            return res.status(400).json({ message: "Event id is required" })
        }

        const attendance = await getEventAttendance(id);

        res.status(200).json({ data: attendance });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
}

export async function createEventAttendanceController(req, res, next) {
    try {
        const eventId = req.params?.id;
        const user_id = req.userId;

        if (eventId == undefined) {
            return res.status(400).json({ message: "Event id is required" });
        }

        await createEventAttendance(user_id, eventId);

        res.status(201).json({ message: "Event Attendance created" });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}