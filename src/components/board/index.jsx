import React from "react";
import Ceil from "../ceil";

function Board({ board, setValue, dis }) {
  return (
    <div className={dis ? 'board is-disabled' : 'board'}>
      {board.map((item, index) => (
        <Ceil key={index} value={item} setValue={() => setValue(index)} />
      ))}
    </div>
  );
}

export default Board;
