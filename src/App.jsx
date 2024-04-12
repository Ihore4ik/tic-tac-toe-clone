import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetBoard, aiSetValueToBoard } from "./store/features/boardSlice";
import Board from "./components/board";

function App() {
  const { board, winner, isDraw, isX } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isX) {
      dispatch(aiSetValueToBoard());
    }
  }, [isX]);

  return (
    <div className="app">
      <div className="container w-[340px]">
        <h1 className="uppercase text-center text-4xl mb-5 font-medium">
          Tic-Tac-Toe
        </h1>
        <h2 className="mx-2 my-5 font-medium">
          Winner - {winner}
          {isDraw && `it's a draw!`}
        </h2>
        <Board board={board} />
        <div className="flex justify-between ">
          <div className="flex flex-col h-[70px] justify-between mt-3">
            <p className={isX ? "activePlayer" : "px-2 py-1"}>Player - YOU</p>
            <p className={!isX ? "activePlayer" : "px-2 py-1"}>Player - AI</p>
          </div>
          <div>
            <button
              className="reset-btn"
              onClick={() => dispatch(resetBoard())}
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
