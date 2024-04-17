import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBoard,
  aiSetValueToBoard,
  aiProfiSetValueToBoard,
} from "./store/features/boardSlice";
import Board from "./components/board";
import AiMode from "./components/aiMode/aiMode";

function App() {
  const { board, winner, isDraw, isX, mode } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isX) {
      mode === "easy"
        ? dispatch(aiSetValueToBoard())
        : dispatch(aiProfiSetValueToBoard());
    }
  }, [isX]);

  return (
    <div className="app">
      <div className="container w-[340px]">
        <h1 className="uppercase text-center text-4xl mb-5 font-medium">
          Tic-Tac-Toe
        </h1>
        <div className="flex justify-between p-2">
          {winner && (
            <h2 className="px-2 py-1 w-full font-medium text-center">
              WINNER - {winner}
            </h2>
          )}
          {isDraw && (
            <h2 className="px-2 py-1 w-full font-medium text-center">
              TIE GAME!
            </h2>
          )}
          {!winner && !isDraw && (
            <>
              <p className={isX ? "activePlayer" : "player"}>PLAYER</p>
              <p className={!isX ? "activePlayer" : "player"}>AI</p>
            </>
          )}
        </div>
        <Board board={board} />
        <div className="flex justify-between my-4">
          <AiMode />
          <button className="reset-btn" onClick={() => dispatch(resetBoard())}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
