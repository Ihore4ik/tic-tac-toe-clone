import { useState } from "react";
import Board from "./components/board";
import { INITIALSTATE, WINNERPOSITIONS as pos } from "./assets/data/data";

function App() {
  const [board, setBoard] = useState(INITIALSTATE);
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(false);
  let player = isX ? "X" : "O";

  const checkActivePlayer = (value) => {
    return value === player ? "activePlayer" : "px-2 py-1";
  };
  const checkWinner = () => {
    for (let [a, b, c] of pos) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return `${board[a] === "X" ? "YOU": "AI"}`;
      }
    }
  };
  const isDraw = () => {
    return !isWinner && !board.includes(null) && `It's a draw!`;
  };
  const resetGame = () => {
    setBoard(INITIALSTATE);
    setIsX(true);
  };
  const isWinner = checkWinner();
  const drar = isDraw();
  const setValue = (ind) => {
    if (board[ind] !== null) return;
    const newArray = board.map((el, index) => (ind === index ? player : el));
    setBoard(newArray);
    setIsX(!isX);
  };
  const aiStep = () => {
    if (player === "O") {
      setTimeout(() => {
        const arr = board.reduce(function (a, e, i) {
          if (e === null) a.push(i);
          return a;
        }, []);
        const newArr = [...board];
        newArr[arr[Math.floor(Math.random()*arr.length)]] = player;
        setBoard(newArr);
        setIsX(!isX);
      }, 1000);
    }
  };
  !isX && aiStep();
  return (
    <div className="flex items-center w-screen h-screen justify-center flex-col bg-gradient-to-r from-[#051937] via-[#008793]  to-[#a8eb12] text-white">
      <div className="container w-[340px]">
        <h1 className="uppercase text-center text-4xl mb-5 font-medium">
          Tic-Tac-Toe
        </h1>
        <h2 className=" my-5">
          Winner - {isWinner} {drar}
        </h2>
        <Board board={board} setValue={setValue} />
        <div className="flex justify-between ">
          <div className="flex flex-col h-[70px] justify-between mt-3">
            <p className={`${checkActivePlayer("X")}`}>Player - YOU</p>
            <p className={`${checkActivePlayer("O")}`}>Player - AI</p>
          </div>
          <div>
            <button
              className="py-2 px-4 font-medium bg-fuchsia-600 hover:bg-white hover:text-fuchsia-600 transition-all ease-linear delay-200 rounded-lg uppercase"
              onClick={resetGame}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
