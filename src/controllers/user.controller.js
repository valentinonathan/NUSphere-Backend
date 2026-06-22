import { getUserDetailsByUsername, getUserDetailsByUserId, processQueryUserToDbQuery, getUserByQuery } from "../services/user.service.js";

export async function getUserDetailsController(req, res, next) {
    try {
        const username = req.params?.username;
        const userId = req.params?.userId;
        let userDetails = null;

        if (username === undefined) {
            userDetails = await getUserDetailsByUserId(userId);
        } else {
            userDetails = await getUserDetailsByUsername(username);
        }

        res.status(200).json(userDetails);
    } catch (error) {
        if (error.message == "Username not found" || error.message == "UserId not found") {
            res.status(404).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
}

export async function getUserWithQueryController(req, res, next) {
    try {
        const faculty = req.query?.faculty;
        const major = req.query?.major;
        const residence = req.query?.residence;
        const year = req.query?.year;
        const nationality = req.query?.nationality;
        const page = req.page;
        const isStrictFilter = req.query?.is_strict_filter == "true" ? true : false;

        const query = processQueryUserToDbQuery(["faculty", "major", "residence", "year", "nationality"], [faculty, major, residence, year, nationality], isStrictFilter);

        const result = await getUserByQuery(query, page);

        res.status(200).json(result);
    } catch (error) {
        console.error("getUserWithQueryController: ", error);
        res.status(500).json({message: error.message});
    }
}