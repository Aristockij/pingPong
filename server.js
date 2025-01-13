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

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.use((socket, middlewareNext) => {
    const username = socket.handshake.auth.userName;

    if (!username) {
      return middlewareNext(new Error("invalid username"));
    }
    socket.username = username;
    middlewareNext();
  });

  io.on("connection", async (socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userId: id,
        username: socket.username,
      });
    }
    socket.emit("users", users);

    socket.broadcast.emit("user connected", {
      userID: socket.id,
      username: socket.username,
    });

    socket.on("private message", ({ content, to }) => {
      socket.to(to).emit("private message", {
        content,
        from: socket.id,
      });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user disconnected", socket.id);
    });

    // const rooms = {};
    // socket.on("create-room", ({ roomTitle, roomPass }) => {
    //   if (rooms[roomTitle]) {
    //     socket.emit("room-error", "Room already exist");
    //     return;
    //   }
    //   rooms[roomTitle] = {
    //     password: roomPass,
    //     users: [],
    //   };
    //   socket.join(roomTitle);
    //   rooms[roomTitle].users.push(socket.id);
    //   io.emit("update-rooms", rooms);
    //   socket.emit("rooms-created", roomTitle);
    // });
    // socket.on("join-room", ({ roomTitle, password }) => {
    //   const room = rooms[roomName];
    //   if (!room) {
    //     socket.emit("room-error", "Room does not exist");
    //     return;
    //   }
    //   if (room.password && room.password !== password) {
    //     socket.emit("room-error", "Incorrect password");
    //     return;
    //   }
    //   socket.join(roomTitle);
    //   room.users.push(socket.id);
    //   io.to(roomTitle).emit("user-joined", { userId: socket.id });
    //   io.emit("rooms-updated", rooms);
    // });
    // socket.on("disconnect", () => {
    //   for (const [roomTitle, room] of Object.entries(rooms)) {
    //     room.users = room.users.filter((id) => id !== socket.id);
    //     if (room.users.length === 0) {
    //       delete rooms[roomTitle];
    //     }
    //   }
    //   io.emit("rooms-updated", rooms);
    // });
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
