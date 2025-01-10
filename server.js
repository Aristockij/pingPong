import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    const rooms = {};

    socket.on("create-room", ({ roomTitle, roomPass }) => {
      console.log(roomTitle, roomPass);

      rooms[roomTitle] = {
        password: roomPass,
        users: [],
      };

      socket.join(roomTitle);
      rooms[roomTitle].users.push(socket.id);

      io.emit("update-rooms", rooms);
      socket.emit("room-created", rooms);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
