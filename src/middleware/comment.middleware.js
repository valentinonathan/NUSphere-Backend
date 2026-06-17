export function postCommentValidator(req, res, next) {
    try {
        const body = req.body;

        if (body?.comment === undefined) {
            return res.status(400).json({message: "Comment field is missing"});
        }

        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}