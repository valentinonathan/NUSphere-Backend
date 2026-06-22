

export function queryValidatorUser(req, res, next) {
    try{
        const faculty = req.query?.faculty;
        const major = req.query?.major;
        const residence = req.query?.residence;
        const year = req.query?.year;
        const nationality = req.query?.nationality;
        const page = req.query?.page;

        if (faculty === undefined && major === undefined && residence === undefined && year === undefined && nationality === undefined) {
            return res.status(400).json({message: "There should be at least one query"});
        }

        const pageNumber = page ? Number(page) : 1;

        if (!Number.isInteger(pageNumber) || pageNumber < 1) {
            return res.status(400).json({
                message: "Page must be a positive integer"
            });
        }

        req.page = pageNumber;

        next();
    } catch (error) {
        console.error("queryValidatorUser: ", error);
        res.status(500).json({message: error.message});
    }
}