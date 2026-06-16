import { getEvent, createEvent } from "../services/event.service.js";

export async function getEventController(req, res, next) {
    try {
        const events = await getEvent();

        res.status(200).json({data: events});

    } catch (error) {

        res.status(500).json({message: error.message});

    }
}

export async function createEventController(req, res, next) {
    try {
        const body = req.body;
        const user_id = req.userId;
        const {title, description, location, start_time} = body;

        await createEvent(user_id, title, description, location, start_time);

        res.status(201).json({message: "Event created"});

    } catch (error) {
        res.status(500).json({message: error.message});

    }
 }