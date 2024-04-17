import { useDispatch, useSelector } from "react-redux";
import { playerSetValueToBoard } from "../../store/features/boardSlice";

function Ceil({ value, index }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(playerSetValueToBoard(index));
  };

  return (
    <div className="ceil" onClick={handleClick}>
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
