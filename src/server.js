import app from "./app.js";
import { setupSocket } from "./socket/index.js";
import http from "http"

const httpServer = http.createServer(app);
setupSocket(httpServer);

httpServer.listen(4000, () => {
  console.log("listening on *:4000");
});