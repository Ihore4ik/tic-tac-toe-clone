import React from "react";
import Ceil from "../ceil";

function Board({ board, setValue }) {
  return (
    <div className="flex flex-wrap w-[350px] h-[350px]">
      {board.map((item, index) => (
        <Ceil key={index} value={item} setValue={() => setValue(index)} />
      ))}
    </div>
  );
}

export default Board;
