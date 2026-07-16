import { Server } from "socket.io";

export function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000", "https://nusphere-seven.vercel.app"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    socket.on("chat:message", (data) => {
      io.emit("chat:message", data);
    });
  });

  return io;
}