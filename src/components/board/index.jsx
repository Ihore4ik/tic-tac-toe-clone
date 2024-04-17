import { useSelector } from "react-redux";
import Ceil from "../ceil";

function Board({ board }) {
  const { strike } = useSelector((state) => state.data);

  return (
    <div className="board">
      <div className={strike ? strike : ""}></div>
      {board.map((item, index) => (
        <Ceil key={index} value={item} index={index} />
      ))}
    </div>
  );
}

export default Board;
