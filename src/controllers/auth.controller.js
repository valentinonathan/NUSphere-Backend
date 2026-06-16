import { validateUser, createAccount, editAccountDetails } from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export async function loginController(req, res, next) {
    try {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        const token = await validateUser(username, password);
        
        // res.cookie("token", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 * 10, secure: true, sameSite: "none"});
        res.status(200).json({token});
    } catch (error) {
        if (error.message == "Username not found") {
            res.status(401).json({message: error.message});
        } else if (error.message == "Password does not match") {
            res.status(401).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
}

export async function createAccountController(req, res, next) {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body?.lastName;
        const username = req.body.username;
        const password = req.body.password;
        
        const token = await createAccount(firstName, lastName, username, password);

        res.cookie("token", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 * 10, secure: true, sameSite: "none"});

        res.status(200).json({token});
    } catch (error) {
        if (error.message == "Username has been used") {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
}

export async function editAccountDetailsController(req, res, next) {
    try {

        const userId = req.userId;
        await editAccountDetails(req.body, userId);

        res.status(200).json({message: "Details saved"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}