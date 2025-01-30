"use client";

import StatusIcon from "./StatusIcon";
import s from "../index.module.scss";
import { useState } from "react";

const MessagePanel = ({ user, onMessage }) => {
  const [content, setContent] = useState("");
  console.log(user);
  return (
    <>
      <div>
        <div className='header'>
          {user.username} <StatusIcon connected={user.connected} />
        </div>
        <ul>
          {user.messages.map((el, index) => (
            <li key={index}>
              <div className={el.fromSelf ? "sender yourself" : "sender"}>
                {el.content}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          onMessage(content);
          setContent("");
        }}
      >
        <div className={s.field}>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder='Your message...'
            className='input'
          />
        </div>

        <button
          disabled={content.length < 3}
          className='send-button'
          type='submit'
        >
          Send
        </button>
      </form>
    </>
  );
};
export default MessagePanel;
