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

export async function authenticateRequest(req, res, next) {
    try {
        const token = req.cookies.token;
        console.log(token);
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