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

export function createListingValidator(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({message: "Image file is required"});
        }

        if (req.body?.title !== undefined && typeof req.body.title !== "string") {
            return res.status(400).json({message: "Title field should be of type string"});
        }

        if (req.body?.description !== undefined && typeof req.body.description !== "string") {
            return res.status(400).json({message: "Description field should be of type string"});
        }

        if (req.body?.price !== undefined && (Number.isNaN(Number(req.body.price)) || Number(req.body.price) < 0)) {
            return res.status(400).json({message: "Price field should be a valid non-negative number"});
        }

        next();
    } catch (error) {
        console.error("createListingValidator: " + error.message, error);
        return res.status(500).json({message: error.message});
    }
}
