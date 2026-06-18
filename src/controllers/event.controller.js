import { getEvent, createEvent, getIndividualEvent } from "../services/event.service.js";

export async function getIndividualEventController(req, res, next) {
    try {
        const eventId = req.params?.id

        if (eventId == undefined) {
             return res.status(400).json({ message: "Event id is required" })
        }

        const events = await getIndividualEvent(eventId);

        res.status(200).json({data: events});

    } catch (error) {

        res.status(500).json({message: error.message});

    }
}

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