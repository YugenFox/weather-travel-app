import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, changeShowAddTask, showAddTask }) => {
  let location = useLocation();

  return (
    <div className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          text={showAddTask ? "Hide Add Task" : "Add Task"}
          color={showAddTask ? "red" : "green"}
          onAdd={changeShowAddTask}
        />
      )}
    </div>
  );
};

// Prop Types
Header.propTypes = {
  title: PropTypes.string,
};
//Prop Defaults
Header.defaultProps = {
  title: "My Todos",
};

export default Header;
