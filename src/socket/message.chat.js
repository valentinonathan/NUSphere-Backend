// import { createMessage } from "../services/conversation.service"

import { createMessage, isUserInConversation } from "../services/conversation.service.js";

export function registerChatEvents(io, socket) {
    socket.on("chat:message", async ({ conversationId, text }) => {
        try {
            // const message = await createMessage({
            //     userId: socket.userId,
            //     text: data.text
            // })

            const room = `conversation:${conversationId}`;

            if (!socket.rooms.has(room)) {
                socket.emit("chat:error", {message : "You are not belong to" + room});
                return;
            }

            const allowed = await isUserInConversation(socket.userId, conversationId)
            if (!allowed) {
                socket.emit("chat:error", {message : "You are not belong to" + room});
                return;
            }

            const result = await createMessage(socket.userId, conversationId, text);

            console.log(result);

            io.to(room).emit("chat:message", result);
        } catch (err) {
            socket.emit("chat:error", { message: err.message });
        }


    })
}