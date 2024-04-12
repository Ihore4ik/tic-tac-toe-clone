import { useDispatch } from "react-redux";
import { playerSetValueToBoard } from "../../store/features/boardSlice";

function Ceil({ value, index }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(playerSetValueToBoard(index));
  };

  return (
    <div
      className="w-[100px] m-2 h-[100px] bg-white flex items-center justify-center cursor-pointer hover:scale-105"
      onClick={handleClick}
    >
      {value === "X" ? (
        <img src="/src/assets/img/cross.png" className="w-[80%]" alt="cross" />
      ) : value === "O" ? (
        <img
          src="/src/assets/img/circle.png"
          className="w-[80%]"
          alt="circle"
        />
      ) : null}
    </div>
  );
}

export default Ceil;
