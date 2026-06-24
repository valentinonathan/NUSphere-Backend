export function createEventInputValidation(req, res, next) {
    try {
        const {
            title,
            description,
            location,
            start_time, 
            url
        } = req.body;

        if (
            title === undefined ||
            description === undefined ||
            location === undefined ||
            start_time === undefined 
        ) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        if (title.trim().length === 0) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (title.length > 255) {
            return res.status(400).json({
                message: "Title cannot exceed 255 characters"
            });
        }

        if (description.length > 2000) {
            return res.status(400).json({
                message: "Description cannot exceed 2000 characters"
            });
        }

        if (location.trim().length === 0) {
            return res.status(400).json({
                message: "Location is required"
            });
        }

        if (location.length > 255) {
            return res.status(400).json({
                message: "Location cannot exceed 255 characters"
            });
        }

        const date = new Date(start_time);

        if (isNaN(date.getTime())) {
            return res.status(400).json({
                message: "Invalid start time"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Image file is required"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}