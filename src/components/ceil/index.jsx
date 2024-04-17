import { useDispatch } from "react-redux";
import { playerSetValueToBoard } from "../../store/features/boardSlice";
import circle from "/src/assets/img/circle.png";
import cross from "/src/assets/img/cross.png";

function Ceil({ value, index }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(playerSetValueToBoard(index));
  };

  return (
    <div className="ceil" onClick={handleClick}>
      {value === "X" ? (
        <img src={cross} className="w-[80%]" alt="cross" />
      ) : value === "O" ? (
        <img
          src={circle}
          className="w-[80%]"
          alt="circle"
        />
      ) : null}
    </div>
  );
}

export default Ceil;
