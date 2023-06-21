import Task from "./Task";
import { PropTypes } from "prop-types";

const Button = ({ text, color, onAdd }) => {
  // const onClick = (e) => {
  //   console.log(e.timeStamp)
  // }

  return (
    <button className="btn" style={{ backgroundColor: color }} onClick={onAdd}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Add Task",
  color: "steelblue",
  onAdd: () => {
    console.log("Need to finish onAdd function in Button");
  },
};

Button.propTypes = {
  text:  PropTypes.string,
  color: PropTypes.string,
  onAdd: PropTypes.func,
};

export default Button;
