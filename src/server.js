import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import app from "./app.js";
import { createMessage, isUserInConversation } from "./services/conversation.service.js";

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://nusphere-seven.vercel.app"],
    credentials: true,
  },
});

function getCookieValue(cookieHeader = "", cookieName) {
  const cookies = cookieHeader.split(";").map((part) => part.trim());

  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === cookieName) return decodeURIComponent(rest.join("="));
  }

  return null;
}

io.use((socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie || "";

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((pair) => {
        const [key, ...value] = pair.split("=");
        return [key, decodeURIComponent(value.join("="))];
      })
    );

    const token = cookies.token;

    if (!token) {
      return next(new Error("No token provided"));
    }

    const payload = jwt.verify(token, process.env.JWT_PASSWORD);
    socket.userId = payload.userId;

    next();
  } catch (error) {
    next(new Error("Authentication failed"));
  }
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id, "User ID:", socket.userId);

  socket.on("conversation:join", async (conversationId) => {
    try {
      const allowed = await isUserInConversation(socket.userId, conversationId);

      if (!allowed) {
        socket.emit("conversation:error", {
          message: "You are not a member of this conversation",
        });
        return;
      }

      const room = `conversation:${conversationId}`;
      socket.join(room);

      console.log(`User ${socket.userId} joined room ${room}`);
    } catch (error) {
      socket.emit("conversation:error", { message: error.message });
    }
  });

  socket.on("message:send", async (data) => {
    try {
      const { conversationId, content } = data;

      if (
        !conversationId ||
        !content ||
        typeof content !== "string" ||
        content.trim().length === 0
      ) {
        socket.emit("message:error", { message: "Invalid message data" });
        return;
      }

      const allowed = await isUserInConversation(socket.userId, conversationId);

      if (!allowed) {
        socket.emit("message:error", {
          message: "You are not allowed to send to this conversation",
        });
        return;
      }

      const message = await createMessage(
        socket.userId,
        conversationId,
        content.trim()
      );

      io.to(`conversation:${conversationId}`).emit("message:receive", {
        id: message.id,
        sender_id: message.sender_id,
        content: message.content,
        created_at: message.created_at,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("message:error", { message: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port 4000");
});