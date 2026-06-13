import db from "../db/index.js";
import bcrypt, { hash } from "bcrypt";
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
        const token = await jwt.sign({username: username}, process.env.JWT_PASSWORD, {sameSite: "none", secure: true});
        return token;
    } else {
        throw new Error("Password does not match");
    }
}

export async function createAccount(firstName, lastName, username, password) {
    let userRows = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    userRows = userRows.rows;

    if (userRows.length != 0) {
        throw new Error("Username has been used");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let query = await db.query(
        "INSERT INTO users(username, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4)",
        [username, firstName, lastName == undefined ? "" : lastName, hashedPassword]
    );

    if (query.rowCount != 1) {
        throw new Error("Update unsuccessful!");
    }

    const token = jwt.sign({username: username}, process.env.JWT_PASSWORD, {sameSite: "none", secure: true});

    return token;
}

export async function editAccountDetails(accountForm, username) {
    const query = await db.query(
        `UPDATE users
        SET nationality = $2,
            year = $3,
            faculty = $4,
            major = $5,
            residence = $6
        WHERE username = $1`,
        [
            username,
            accountForm.Nationality,
            accountForm.Year,
            accountForm.Faculty,
            accountForm.Major,
            accountForm.Residence
        ]
    );

    if (query.rowCount != 1) {
        throw new Error("Update unsuccessful!");
    } 
}