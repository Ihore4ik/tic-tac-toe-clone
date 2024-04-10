import { useState } from "react";
import Board from "./components/board";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  return (
    <div className="flex items-center w-screen h-screen justify-center flex-col bg-gradient-to-r from-[#051937] via-[#008793]  to-[#a8eb12]">
      <h1 className="uppercase text-4xl my-5 font-medium">Tic-Tac-Toe</h1>
      <Board board={board}/>
    </div>
  );
}

export default App;
