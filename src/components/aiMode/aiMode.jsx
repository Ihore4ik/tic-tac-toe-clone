import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAIMode } from "../../store/features/boardSlice";

function AiMode() {
  const [mode, setMode] = useState("easy");
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setMode(e.target.value);
    dispatch(setAIMode(e.target.value.toLowerCase()));
  };
  return (
    <select
      className="bg-fuchsia-600 uppercase p-2 mx-2 rounded-md outline-none shadow-md shadow-black"
      value={mode}
      onChange={handleOnChange}
    >
      <option value="easy">Easy</option>
      <option value="hard">Hard</option>
    </select>
  );
}

export default AiMode;
