import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed (jpeg, png, webp, gif)"));
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

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

export function createPostValidator(req, res, next) {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({message: "Image file is required"});
        }

        // Caption is optional
        if (req.body?.caption !== undefined) {
            if (typeof req.body.caption !== "string") {
                return res.status(400).json({message: "Caption field should be of type string"});
            }
            if (req.body.caption.length > 500) {
                return res.status(400).json({message: "Caption is too long (max 500 characters)"});
            }
        }

        next();
    } catch (error) {
        console.error("createPostValidator: " + error.message, error);
        res.status(500).json({message: error.message});
    }
}

export function feedRequestValidator(req, res, next) {
    const page = req.query?.page;

    if (page === undefined) {
        res.status(400).json({message: "Page query is missing"});
    }

    next();
}