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

    socket.on("create-room", ({ roomName, pass }) => {
      if (rooms[roomName]) {
        socket.emit("room-error", "Room already exists");
        return;
      }

      rooms[roomName] = {
        pass,
        users: [],
      };

      socket.join(roomName);
      rooms[roomName].users.push(socket.id);

      io.emit("rooms-updated", rooms);
      socket.emit("room-created", roomName);
    });

    socket.on("join-room", ({ roomName, pass }) => {
      const room = rooms[roomName];
      if (!room) {
        socket.emit("room-error", "Room does not exist");
        return;
      }

      if (room.password && room.password !== pass) {
        socket.emit("room-error", "Incorrect password");
        return;
      }

      socket.join(roomName);
      room.users.push(socket.io);

      io.to(roomName).emit("user-joined", { userId: socket.id });
      io.emit("rooms-updated", rooms);
    });

    socket.on("disconnect", () => {
      for (const [roomName, room] of Object.entries(rooms)) {
        room.users = room.users.filter((id) => id !== socket.id);

        if (room.users.length === 0) {
          delete rooms[roomName];
        }
      }

      io.emit("rooms-updated", rooms);
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
