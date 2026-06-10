import { validateUser } from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export async function loginController(req, res, next) {
    try {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        const isValid = await validateUser(username, password);
        
        if (isValid) {
            const token = await jwt.sign({username: username}, process.env.JWT_PASSWORD);
            res.cookie("token", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 * 10});
            res.status(200).send("You are authorized");
        }
    } catch (error) {
        if (error.message == "Username not found") {
            res.status(401).send(error.message);
        } else if (error.message == "Password does not match") {
            res.status(401).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
}