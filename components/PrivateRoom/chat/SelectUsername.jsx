"use client";

import { useState } from "react";
import s from "../index.module.scss";

const SelectUsername = ({ onInput }) => {
  const [username, setUsername] = useState("");
  const isValid = username.length > 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onInput(username);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <button type='submit' disabled={!isValid}>
          Register
        </button>
      </form>
    </div>
  );
};
export default SelectUsername;
