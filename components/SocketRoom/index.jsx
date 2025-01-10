"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import s from "./index.module.scss";
const socket = io();

const SocketRoom = () => {
  const [roomTitle, setRoomTitle] = useState("");
  const [roomPass, setRoomPass] = useState("");

  const [rooms, setRooms] = useState({});

  useEffect(() => {
    socket.on("rooms-updated", (updatedRooms) => {
      console.log(updatedRooms);

      setRooms(updatedRooms);
    });
    return () => {
      socket.off("rooms-updated");
    };
  }, []);

  const joinRoom = (roomName) => {
    const password = prompt("Enter room password (if any):");
    socket.emit("join-room", { roomName, password });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("create-room", { roomTitle, roomPass });
        }}
      >
        <div className={s.field}>
          <label htmlFor='room__name'>room name</label>
          <input
            onChange={(e) => setRoomTitle(e.target.value)}
            value={roomTitle}
            id='room__name'
            type='text'
          />
        </div>
        <div className={s.field}>
          <label htmlFor='room__pass'>room password</label>
          <input
            onChange={(e) => setRoomPass(e.target.value)}
            value={roomPass}
            id='room__pass'
            type='text'
          />
        </div>

        <button className='btn' type='submit'>
          create room
        </button>
      </form>

      <div>
        {Object.entries(rooms).map(([roomName, roomData]) => (
          <li key={roomName}>
            {roomName} ({roomData.users.length} users)
            {roomData.password && " 🔒"}
            <button onClick={() => joinRoom(roomName)}>Join</button>
          </li>
        ))}
      </div>
    </div>
  );
};
export default SocketRoom;
