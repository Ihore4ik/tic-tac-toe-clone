import { useState, useEffect } from "react";
import Board from "./components/board";
import { INITIALSTATE, WINNERPOSITIONS as pos } from "./assets/data/data";
import { getRandomNumber, checkActivePlayer } from "./assets/helpers/functions";

function App() {
  const [board, setBoard] = useState(INITIALSTATE);
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(null);
  let player = isX ? "X" : "O";

  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    isDraw();
    for (let [a, b, c] of pos) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(`${board[a] === "X" ? "YOU" : "AI"}`);
      }
    }
  };
  const isDraw = () => {
    if (!winner && !board.includes(null)) {
      setWinner(`It's a draw!`);
    }
  };
  const resetGame = () => {
    setBoard(INITIALSTATE);
    setIsX(true);
    setWinner(null);
  };

  const setValue = (ind) => {
    if (winner) return;
    if (board[ind] !== null) return;
    const newArray = board.map((el, index) => (ind === index ? player : el));
    setBoard(newArray);
    setIsX(!isX);
  };
  const aiStep = () => {
    if (player === "O") {
      setTimeout(() => {
        const arr = board.reduce(function (array, item, index) {
          if (item === null) array.push(index);
          return array;
        }, []);
        const newArr = [...board];
        newArr[arr[getRandomNumber(arr.length)]] = player;
        setBoard(newArr);
        setIsX(!isX);
      }, 1000);
    }
  };
  !isX && !winner && aiStep();
  return (
    <div className="app">
      <div className="container w-[340px]">
        <h1 className="uppercase text-center text-4xl mb-5 font-medium">
          Tic-Tac-Toe
        </h1>
        <h2 className="mx-2 my-5 font-medium">Winner - {winner}</h2>
        <Board board={board} setValue={setValue} dis={winner} />
        <div className="flex justify-between ">
          <div className="flex flex-col h-[70px] justify-between mt-3">
            <p className={`${checkActivePlayer("X", player)} px-2 py-1`}>
              Player - YOU
            </p>
            <p className={`${checkActivePlayer("O", player)} px-2 py-1`}>
              Player - AI
            </p>
          </div>
          <div>
            <button
              className="reset-btn"
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
