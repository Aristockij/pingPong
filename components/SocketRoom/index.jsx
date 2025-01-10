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
    socket.on("update-rooms", (room) => {
      setRooms(room);
    });

    return () => {
      socket.off("update-rooms", (room) => {
        setRooms(room);
      });
    };
  }, []);

  console.log(rooms);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("create-room", { roomTitle, roomPass });
          socket.on("update-rooms", (rooms) => {
            setRooms(rooms);
          });
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

      <div></div>
    </div>
  );
};
export default SocketRoom;
