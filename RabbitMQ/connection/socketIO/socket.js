import { createServer } from "http";
import { Server } from "socket.io";

export function connect(app) {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  console.log("Connected to SocketIO");
  return { io, httpServer };
}
