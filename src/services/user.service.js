import db from "../db/index.js";

export async function getUserDetailsByUsername(username) {
    const query = await db.query("SELECT * FROM users WHERE username = $1", [username]);

    if (query.rowCount == 0) {
        throw new Error("Username not found");
    }

    const { id, first_name, last_name, nationality, year, faculty, major, residence, bio, friends } = query.rows[0];
    const userDetails = {id: id, username: username, firstName: first_name, lastName: last_name, nationality: nationality, year: year, faculty: faculty, major: major, residence: residence, bio: bio, friends: friends};

    return userDetails;
}

export async function getUserDetailsByUserId(userId) {
    const query = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (query.rowCount == 0) {
        throw new Error("UserId not found");
    }

    const { id, username, first_name, last_name, nationality, year, faculty, major, residence, bio, friends } = query.rows[0];
    const userDetails = {id: id, username: username, firstName: first_name, lastName: last_name, nationality: nationality, year: year, faculty: faculty, major: major, residence: residence, bio: bio, friends: friends};

    return userDetails;
}

export function processQueryUserToDbQuery(criteriaArray, queryArray, isStrictFilter) {
    let dbQueryAnd = "";
    let dbQueryOr = "";
    let numOfQuery = 0;
    
    for (let i = 0; i < queryArray.length; ++i) {
        if (queryArray[i] !== undefined && queryArray[i] != "") {
            queryArray[i].replace(/\+/g, " ");
            const strArray = queryArray[i].split(",");
            if (numOfQuery > 0) {
                dbQueryAnd += " AND " + criteriaArray[i] + " = ANY(ARRAY[";
                dbQueryOr += " OR " + criteriaArray[i] + " = ANY(ARRAY[";
                for (let j = 0; j < strArray.length; ++j) {
                    if (j == 0) {
                        dbQueryAnd += `'${strArray[j]}'`;
                        dbQueryOr += `'${strArray[j]}'`;
                    } else {
                        dbQueryAnd += `, '${strArray[j]}'`;
                        dbQueryOr += `, '${strArray[j]}'`;
                    }
                }
                dbQueryAnd += "])";
                dbQueryOr += "])";
            } else {
                dbQueryAnd += criteriaArray[i] + " = ANY(ARRAY[";
                dbQueryOr += criteriaArray[i] + " = ANY(ARRAY[";
                for (let j = 0; j < strArray.length; ++j) {
                    if (j == 0) {
                        dbQueryAnd += `'${strArray[j]}'`;
                        dbQueryOr += `'${strArray[j]}'`;
                    } else {
                        dbQueryAnd += `, '${strArray[j]}'`;
                        dbQueryOr += `, '${strArray[j]}'`;
                    }
                }
                dbQueryAnd += "])";
                dbQueryOr += "])";
            }
            numOfQuery++;
        }
    }
    if (isStrictFilter) {
        const query = "SELECT id, username, first_name, last_name, nationality, year, faculty, major, residence, bio, friends FROM users WHERE " + dbQueryAnd;
        return query;
    } else {
        const query = "SELECT id, username, first_name, last_name, nationality, year, faculty, major, residence, bio, friends FROM users WHERE " 
            + dbQueryOr + " ORDER BY CASE WHEN " + dbQueryAnd + " THEN 1 WHEN " + dbQueryOr + " THEN 2 ELSE 3 END";
        return query;
    }
}

export async function getUserByQuery(query, page) {
    const limit = 20;
    const offset = (page - 1) * 20;
    query += ` LIMIT ${limit} OFFSET ${offset}`;
    const result = await db.query(query);
    return {message: "Query successful", users: result.rows, page: Number(page), total: result.rowCount};
}