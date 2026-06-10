import db from "../db/index.js";
import bcrypt from "bcrypt";

// CREATE table users (
// 	id BIGSERIAL PRIMARY KEY,
// 	username VARCHAR(30) UNIQUE,
// 	first_name VARCHAR(30) NOT NULL,
// 	last_name VARCHAR(30),
// 	password_hash VARCHAR(255) NOT NULL
// );


export async function validateUser(username, password) {
    let userRows = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    userRows = userRows.rows;

    if (userRows.length == 0) {
        throw new Error("Username not found");
    }
    
    const dbHashedPassword = userRows?.[0]?.password_hash;

    const isValid = await bcrypt.compare(password, dbHashedPassword);
    
    if (isValid) {
        return true;
    } else {
        throw new Error("Password does not match");
    }
}