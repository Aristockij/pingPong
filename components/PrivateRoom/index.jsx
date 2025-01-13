"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import s from "./index.module.scss";
// import { io } from "socket.io-client";

// const socket = io();

const PrivateRoom = () => {
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      users.forEach((user) => {
        if (user.self) {
          user.connect = true;
        }
      });
    });

    socket.on("disconnect", () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = false;
        }
      });
    });

    const initReactiveProperties = (user) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };

    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
      });

      setUsers((userArr) =>
        userArr.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        })
      );
    });

    socket.on("user connected", (user) => {
      initReactiveProperties(user);
      setUsers((el) => [...el, user]);
      console.log(users);
    });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setUsernameAlreadySelected(false);
      }
    });

    socket.on("private message", ({ content, from }) => {
      for (let i = 0; i < users.length; i++) {
        const user = user[i];
        if (user.userID === from) {
          user.messages.push({
            content,
            fromSelf: false,
          });
          if (user !== selectedUser) {
            user.hasNewMessage = true;
          }
          break;
        }
      }
    });

    return () => {
      socket.off("connect_error");
    };
  }, []);

  const onMessage = (content) => {
    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });
      setSelectedUser((user) =>
        user.messages.push({
          content,
          fromSelf: true,
        })
      );
    }
  };

  return (
    <div>
      {!usernameAlreadySelected ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setUsernameAlreadySelected(true);
            socket.connect();
            socket.auth = { userName };
          }}
        >
          <div className={s.field}>
            <input
              type='text'
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
            />
          </div>

          <button type='submit'>Send</button>
        </form>
      ) : (
        <div className={s.chat}>
          <div className={s.flex}>
            <div>
              {users.map((el) => (
                <span key={el}>{el}</span>
              ))}
            </div>
            <div>
              <div className={s.content}></div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e);
                  onMessage(e.target.value);
                }}
              >
                <div className={s.field}>
                  <input type='text' />
                </div>

                <button>send message</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PrivateRoom;
