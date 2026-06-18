export function postCommentValidator(req, res, next) {
    try {
        const body = req.body;

        if (body?.comment === undefined) {
            return res.status(400).json({message: "Comment field is missing"});
        }

        if (typeof body.comment !== "string") {
            return res.status(400).json({message: "Comment must be of type string"});
        }

        next();
    } catch (error) {
        console.error("postCommentValidator: " + error.message, error);
        res.status(500).json({message: error.message});
    }
}