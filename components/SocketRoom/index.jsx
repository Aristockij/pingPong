// "use client";

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { useRouter } from "next/navigation";
// import s from "./index.module.scss";
// const socket = io();

// const SocketRoom = () => {
//   const [roomTitle, setRoomTitle] = useState("");
//   const [roomPass, setRoomPass] = useState("");

//   const [rooms, setRooms] = useState({});
//   const router = useRouter();

//   useEffect(() => {
//     socket.on("update-rooms", (room) => {
//       setRooms(room);
//     });

//     return () => {
//       socket.off("update-rooms", (room) => {
//         setRooms(room);
//       });
//     };
//   }, []);

//   useEffect(() => {
//     socket.on("room-error", (error) => {
//       alert(error);
//     });

//     return () => {
//       socket.off("room-error");
//     };
//   }, []);

//   const joinRoom = (roomName) => {
//     const password = prompt("Enter room password: ");
//     socket.emit("join-room", { roomName, password });
//     router.push(`/room/${roomName}`);
//   };

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           socket.emit("create-room", { roomTitle, roomPass });
//           router.push(`/room/${roomTitle}`);
//         }}
//       >
//         <div className={s.field}>
//           <label htmlFor='room__name'>room name</label>
//           <input
//             onChange={(e) => setRoomTitle(e.target.value)}
//             value={roomTitle}
//             id='room__name'
//             type='text'
//           />
//         </div>
//         <div className={s.field}>
//           <label htmlFor='room__pass'>room password</label>
//           <input
//             onChange={(e) => setRoomPass(e.target.value)}
//             value={roomPass}
//             id='room__pass'
//             type='text'
//           />
//         </div>

//         <button className='btn' type='submit'>
//           create room
//         </button>
//       </form>

//       <div>
//         {rooms != undefined ? (
//           <ul>
//             {Object.entries(rooms).map(([roomTitle, roomData]) => (
//               <li key={roomTitle}>
//                 {roomTitle} ({roomData.users.length} users)
//                 {roomData.password && " 🔒 "}
//                 <button onClick={() => joinRoom(roomTitle)}> Join</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <span>room list is empty</span>
//         )}
//       </div>
//     </div>
//   );
// };
// export default SocketRoom;
