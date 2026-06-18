export function likePostValidator(req, res, next) {
    try {
        const body = req.body;

        if (req.body?.like === undefined) {
            res.status(400).json({message: "Like field missing"});
        } 
        if (typeof req.body.like !== "boolean") {
            res.status(400).json({message: "Like field should be of type boolean"});
        }

        next();
    } catch (error) {
        console.error("likePostValidator: " + error.message, error);
        res.status(500).json({message: error.message});
    }
}