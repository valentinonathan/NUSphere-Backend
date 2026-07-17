// import { createMessage } from "../services/conversation.service"

export function registerChatEvents(io, socket) {
    socket.on("chat:message", async (data) => {
        try {
            // const message = await createMessage({
            //     userId: socket.userId,
            //     text: data.text
            // })

            io.emit("chat:message", message);
        } catch (err) {
            socket.emit("chat:error", { message: "Failed to send message"});
        }


    })
}