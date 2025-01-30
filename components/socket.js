import { io } from "socket.io-client";

const URL = "http://localhost:4000";
export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

// export default socket;
