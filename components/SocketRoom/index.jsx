"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import s from "./index.module.scss";
const socket = io();

const SocketRoom = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const [roomTitle, setRoomTitle] = useState("");
  const [roomPass, setRoomPass] = useState("");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const pingSocket = () => {
    socket.emit("ping");
  };

  return (
    <div>
      <button onClick={pingSocket}>ping</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(roomTitle, roomPass);
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

      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
    </div>
  );
};
export default SocketRoom;
