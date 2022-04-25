import { createServer } from "http";
import { Server } from "socket.io";

export function connect(app) {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  return { io, httpServer };
}
