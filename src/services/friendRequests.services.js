import db from "../db/index.js"
import { userIdExists } from "../utils/user.utils.js"

export async function friendRequest(senderId, receiverId) {
    if (!(await userIdExists(receiverId))) {
        throw new Error("receiverId does not exist");
    }

    if (senderId == receiverId) {
        throw new Error("Cannot friend yourself");
    }

    const smallerId = Math.min(senderId, receiverId);
    const largerId = Math.max(senderId, receiverId);

    const checkFriends = await db.query("SELECT * FROM friends WHERE user1_id = $1 AND user2_id = $2", [smallerId, largerId]);

    if (checkFriends.rowCount > 0) {
        return {status: "isFriend"};
    }

    const checkReceiverRequest = await db.query("SELECT * FROM friend_requests WHERE sender_id = $1 and receiver_id = $2", [receiverId, senderId]);

    if (checkReceiverRequest.rowCount > 0) { // If 
        // Get a dedicated database connection from the pool.
        // All queries in a transaction must use the same connection.
        const client = await db.connect();

        try {
            // Start transaction.
            // If any query fails later, rollback everything.
            await client.query("BEGIN");

            // Create the friendship relationship.
            await client.query(
                "INSERT INTO friends(user1_id, user2_id) VALUES($1, $2)",
                [smallerId, largerId]
            );

            // Remove the pending friend request since they are now friends.
            await client.query(
                "DELETE FROM friend_requests WHERE sender_id = $1 AND receiver_id = $2",
                [receiverId, senderId]
            );

            // Increment sender's friend count.
            await client.query(
                "UPDATE users SET friends = friends + 1 WHERE id = $1",
                [senderId]
            );

            // Increment receiver's friend count.
            await client.query(
                "UPDATE users SET friends = friends + 1 WHERE id = $1",
                [receiverId]
            );

            // All queries succeeded, permanently save the changes.
            await client.query("COMMIT");

            return {status: "isFriend"};
        } catch (error) {
            // Something failed.
            // Undo every query since BEGIN.
            await client.query("ROLLBACK");

            console.error("friendRequest:", error);

            throw new Error("Failed to create friend relationship");
        } finally {
            // Return the connection to the pool
            // regardless of success or failure.
            client.release();
        }
    } else {
        try {
            // No reverse request exists.
            // Create a new pending friend request.
            await db.query(
                "INSERT INTO friend_requests(sender_id, receiver_id) VALUES($1, $2)",
                [senderId, receiverId]
            );
            return {status: "requestSuccess"};
        } catch (error) {
            console.error("friendRequest:", error);

            throw new Error("Failed to add friend request");
        }
    }
}

export async function unfriendRequest(senderId, receiverId) {
    if (!(await userIdExists(receiverId))) {
        throw new Error("receiverId does not exist");
    }

    if (senderId == receiverId) {
        throw new Error("Cannot unfriend yourself");
    }

    const smallerId = Math.min(senderId, receiverId);
    const largerId = Math.max(senderId, receiverId);

    const checkFriends = await db.query("SELECT * FROM friends WHERE user1_id = $1 AND user2_id = $2", [smallerId, largerId]);

    if (checkFriends.rowCount > 0) {
        const client = await db.connect();
        try {
            // Start transaction.
            // If any query fails later, rollback everything.
            await client.query("BEGIN");

            // Create the friendship relationship.
            await client.query(
                "DELETE FROM friends WHERE user1_id = $1 AND user2_id = $2",
                [smallerId, largerId]
            );

            // Decrement sender's friend count.
            await client.query(
                "UPDATE users SET friends = friends - 1 WHERE id = $1",
                [senderId]
            );

            // Decrement receiver's friend count.
            await client.query(
                "UPDATE users SET friends = friends - 1 WHERE id = $1",
                [receiverId]
            );

            // All queries succeeded, permanently save the changes.
            await client.query("COMMIT");

            return {status: "isNotFriend"};
        } catch (error) {
            // Something failed.
            // Undo every query since BEGIN.
            await client.query("ROLLBACK");

            console.error("friendRequest:", error);

            throw new Error("Failed to create friend relationship");
        } finally {
            // Return the connection to the pool
            // regardless of success or failure.
            client.release();
        }
    } else {
        return {status: "isNotFriend"};
    }
}

export async function unsendFriendRequest(senderId, receiverId) {
    if (!(await userIdExists(receiverId))) {
        throw new Error("receiverId does not exist");
    }

    if (senderId == receiverId) {
        throw new Error("Cannot unfriend yourself");
    }

    const query = await db.query("DELETE FROM friend_requests WHERE sender_id = $1 AND receiver_id = $2", [senderId, receiverId]);

    if (query.rowCount > 0) {
        return {status: "isNotFriend"};
    } else {
        throw new Error("unsendFriendRequest failed");
    }
}

export async function friendRequestStatus(senderId, receiverId) {
    if (!(await userIdExists(receiverId))) {
        throw new Error("receiverId does not exist");
    }

    if (senderId == receiverId) {
        return {status: "sameAccount"};
    }

    const smallerId = Math.min(senderId, receiverId);
    const largerId = Math.max(senderId, receiverId);

    const checkFriends = await db.query("SELECT * FROM friends WHERE user1_id = $1 AND user2_id = $2", [smallerId, largerId]);

    if (checkFriends.rowCount > 0) {
        return {status: "isFriend"};
    } 

    const checkReceiverRequest = await db.query("SELECT * FROM friend_requests WHERE sender_id = $1 and receiver_id = $2", [receiverId, senderId]);

    if (checkReceiverRequest.rowCount > 0) {
        return {status: "hasBeenRequested"};
    } else {
        const checkSenderRequest = await db.query("SELECT * FROM friend_requests WHERE sender_id = $1 and receiver_id = $2", [senderId, receiverId]);
        if (checkSenderRequest.rowCount > 0) {
            return {status: "requestSuccess"};        
        } else {
            return {status: "hasNotBeenRequested"};
        }
    }
}