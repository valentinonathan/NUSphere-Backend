import db from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function validateUser(username, password) {
    let userRows = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    userRows = userRows.rows;

    if (userRows.length == 0) {
        throw new Error("Username not found");
    }
    
    const dbHashedPassword = userRows?.[0]?.password_hash;

    const isValid = await bcrypt.compare(password, dbHashedPassword);
    
    if (isValid) {
        const token = await jwt.sign({username: username}, process.env.JWT_PASSWORD);
        return token;
    } else {
        throw new Error("Password does not match");
    }
}