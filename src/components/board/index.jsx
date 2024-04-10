import React from "react";
import Ceil from "../ceil";

function Board({ board }) {
  return (
    <div className="flex flex-wrap w-[350px] h-[350px]">
      {board.map((item, index) => (
        <Ceil key={index} value={item} />
      ))}
    </div>
  );
}

export default Board;
