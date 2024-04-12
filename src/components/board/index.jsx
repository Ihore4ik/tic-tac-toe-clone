import { useSelector } from "react-redux";
import Ceil from "../ceil";

function Board({ board }) {
  const { winner } = useSelector((state) => state.data);

  return (
    <div className={winner ? "board is-disabled" : "board"}>
      {board.map((item, index) => (
        <Ceil key={index} value={item} index={index} />
      ))}
    </div>
  );
}

export default Board;
