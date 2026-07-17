import app from "./app.js";
import { setupSocket } from "./socket/index.js";
import http from "http"

const httpServer = http.createServer(app);
setupSocket(httpServer);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log("listening on *:4000");
});