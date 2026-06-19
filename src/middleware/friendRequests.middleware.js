export function friendRequestValidator(req, res, next) {
    try {
        const body = req.body;
        const userId = req.userId;

        if (body?.action === undefined) {
            return res.status(400).json({message: "Missing field action"});
        }

        if (body.action != "Unfriend" && body.action != "Unsend request" && body.action != "Request") {
            return res.status(400).json({message: "Action field should be either Request, Unfriend, or Unsend Request"});
        }
        next();
    } catch (error) {
        console.error("friendRequestValidator", error);
        res.status(500).json({message: error.message});
    }
}