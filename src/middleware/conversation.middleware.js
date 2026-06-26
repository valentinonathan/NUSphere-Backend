export function createConversationValidator(req, res, next) {
    try {
        const { receiverId, message } = req.body;

        if (receiverId === undefined) {
            return res.status(400).json({message: "receiverId is required"});
        }

        if (typeof receiverId !== "number" && typeof receiverId !== "string") {
            return res.status(400).json({message: "receiverId must be a number"});
        }

        if (message !== undefined && typeof message !== "string") {
            return res.status(400).json({message: "message must be a string"});
        }

        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export function sendMessageValidator(req, res, next) {
    try {
        const { content } = req.body;

        if (content === undefined || typeof content !== "string" || content.trim().length === 0) {
            return res.status(400).json({message: "Content is required"});
        }

        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
