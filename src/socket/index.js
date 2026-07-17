import { Server } from "socket.io";
import { registerChatEvents } from "./message.chat.js";
import { socketAuth } from "./auth.js";
import { registerRoomEvents } from "./room.chat.js";


export function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000", "https://nusphere-seven.vercel.app", "https://nusphere-lthmgo484-valentino-nathan-s-projects.vercel.app/"],
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    registerRoomEvents(io, socket);
    registerChatEvents(io, socket);

  });

  return io;
}