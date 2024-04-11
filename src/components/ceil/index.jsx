import React from "react";

function Ceil({ value, setValue }) {
  return (
    <div
      className="w-[100px] m-2 h-[100px] bg-white flex items-center justify-center cursor-pointer hover:scale-105"
      onClick={setValue}
    >
      {
        value === "X" ? (
        <img src="/src/assets/img/cross.png" className="w-[80%]" alt="cross" />
      ) : value === "O" ? (
        <img src="/src/assets/img/circle.png" className="w-[80%]" alt="circle" />
      ) : null
      }
    </div>
  );
}

export default Ceil;
