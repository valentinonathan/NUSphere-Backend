import jwt from "jsonwebtoken";

export function loginInputValidation(req, res, next) {
    try {
        const body = req.body;
        const username = body?.username;
        const password = body?.password;

        if (username == undefined || password == undefined) {
            return res.status(400).json({message: "Either username or password is missing!"});
        }

        if (username.length > 30) return res.status(400).json({message: "Username length should not be > 30"});

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export function createAccountInputValidation(req, res, next) {
    try {
        const firstName = req.body?.firstName;
        const lastName = req.body?.lastName;
        const username = req.body?.username;
        const password = req.body?.password;

        if (firstName == undefined || username == undefined || password == undefined) {
            return res.status(400).json({message: "Bad Request"});
        }

        function isValidUsername(username) {
            return /^[a-zA-Z0-9_]{3,20}$/.test(username);
        } 
        function isValidFirstName(firstName) {
            return /^[A-Za-z]+$/.test(firstName);
        }

        let passChecks = true;

        if (firstName.length == 0) {
            passChecks = false;
            return res.status(400).json({message: "First name field is required!"});
        } else if (!isValidFirstName(firstName)) {
            passChecks = false;
            return res.status(400).json({message: "First name must not contain symbols or numbers!"});
        }
        if (lastName != undefined && lastName.length > 0 && !isValidFirstName(lastName)) {
            passChecks = false;
            return res.status(400).json({message: "Last name should not contain any symbols or numbers!"});
        }
        if (!isValidUsername(username)) {
            passChecks = false;
            return res.status(400).json({message: "Username must be 3-20 characters long and contains only letters, numbers, and underscores!"});
        }
        if (password.length < 8) {
            passChecks = false;
            return res.status(400).json({message: "Password must be more than 8 characters"});
        }

        if (passChecks) {
            next();
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function authenticateRequest(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({message: "Not authenticated"});
        }
        
        let payload = null;
        try {
            payload = await jwt.verify(token, process.env.JWT_PASSWORD);
        } catch (error) {
            return res.status(401).json({message: "Not authenticated"});
        }

        req.username = payload?.username;
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export function editAccountDetailsMiddleware(req, res, next) {
    try {
        const {Nationality: nationality, Year: year, Faculty: faculty, Major: major, Residence: residence} = req.body;

        if (nationality == undefined || year == undefined || faculty == undefined || major == undefined || residence == undefined) {
            return res.status(400).json({message: "Bad request format"});
        }

        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}