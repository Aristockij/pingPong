"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import s from "./index.module.scss";

import SelectUsername from "./chat/SelectUsername";
import Chat from "./chat/Chat";

const PrivateRoom = () => {
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);

  const selectedUser = (username) => {
    setUsernameAlreadySelected(true);
    socket.auth = { username };
    socket.connect();
  };

  useEffect(() => {
    const handleConnectError = (err) => {
      if (err.message === "invalid username") {
        setUsernameAlreadySelected(false);
      }
    };
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect_error", handleConnectError);
    };
  }, []);

  return (
    <section className='container'>
      {!usernameAlreadySelected ? (
        <SelectUsername onInput={selectedUser} />
      ) : (
        <Chat />
      )}
    </section>
  );
};
export default PrivateRoom;
