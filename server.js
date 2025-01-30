import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 4000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: `http://${hostname}:${port}`,
    },
  });

  io.use((socket, middlewareNext) => {
    const username = socket.handshake.auth.username;

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
        userID: id,
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
      console.log(content);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user disconnected", socket.id);
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
