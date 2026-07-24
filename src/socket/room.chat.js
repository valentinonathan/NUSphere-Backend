import { isUserInConversation } from "../services/conversation.service.js";

export function registerRoomEvents(io, socket) {

    socket.on("join-conversation", async ({conversationId}) => {
        try {
            const allowed = isUserInConversation(socket.userId, conversationId);
            if (!allowed) {
                socket.emit("error", { message: "You are not a member of this conversation" })
                return;
            }
            socket.join(`conversation:${conversationId}`);
            socket.emit("room:joined", { conversationId })
            console.log(`${socket.userId} has joined conversation ${conversationId}`)
        } catch (error) {
            socket.emit("error", { message: error.message })
        }
    })

    socket.on("leave-conversation", ({ conversationId }) => {
        const roomName = `conversation:${conversationId}`;
        socket.leave(roomName);

        socket.emit("room:left", { conversationId });
        console.log(`Socket ${socket.id} left ${roomName}`);
    });
}