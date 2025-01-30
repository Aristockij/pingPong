"use client";

import User from "./User";
import MessagePanel from "./MessagePanel";
import { useEffect, useState } from "react";
import { socket } from "../../socket";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const initReactiveProperties = (user) => ({
      ...user,
      connected: true,
      messages: [],
      hasNewMessages: false,
    });

    socket.on("connect", () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.self ? { ...user, connected: true } : user
        )
      );
    });

    socket.on("disconnect", () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.self ? { ...user, connected: false } : user
        )
      );
    });

    socket.on("users", (users) => {
      const updatedUsers = users.map((user) => {
        user.self = user.userID === socket.id;
        return initReactiveProperties(user);
      });

      updatedUsers.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      setUsers(updatedUsers);
    });

    socket.on("user connected", (user) => {
      const newUser = initReactiveProperties(user);

      setUsers((prevUsers) => [...prevUsers, newUser]);
    });

    socket.on("user disconnected", (id) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userID === id ? { ...user, connect: false } : user
        )
      );
    });

    socket.on("private message", ({ content, from }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.userID === from) {
            const newMessages = [
              ...user.messages,
              { content, fromSelf: false },
            ];
            return {
              ...user,
              messages: newMessages,
              hasNewMessages: user !== selectedUser,
            };
          }
          return user;
        })
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
    };
  }, [selectedUser]);

  function onMessage(content) {
    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userID === selectedUser.userID
            ? {
                ...user,
                messages: [...user.messages, { content, fromSelf: true }],
              }
            : user
        )
      );
      setSelectedUser((prevUser) => ({
        ...prevUser,
        messages: [...prevUser.messages, { content, fromSelf: true }],
      }));
      console.log(selectedUser);
    }
  }

  function onSelectedUser(user) {
    setSelectedUser(user);
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.userID === user.userID ? { ...u, hasNewMessages: false } : u
      )
    );
  }

  return (
    <div className='chat__wrap'>
      <div className='left-panel'>
        {users.map((user) => (
          <User
            key={user.userID}
            user={user}
            isSelected={selectedUser?.userID === user.userID}
            onSelect={() => onSelectedUser(user)}
          />
        ))}
      </div>

      <div className='right-panel'>
        {selectedUser && (
          <MessagePanel user={selectedUser} onMessage={onMessage} />
        )}
      </div>
    </div>
  );
};
export default Chat;
