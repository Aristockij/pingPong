import { io } from "socket.io-client";

// const URL = "http://localhost:3000/rooms";
export const socket = io({ autoConnect: false });

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

// export default socket;
