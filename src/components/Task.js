import { TiDelete } from "react-icons/ti";

const Task = ({ task, deleteTask, toggleReminder }) => {
  //set up api to get long & lat from the location or should I do this when making the task itself....

  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        Location: {task.address}
        <TiDelete
          style={{ color: "red" }}
          onClick={() => deleteTask(task.id)}
        />
      </h3>

      <p>{task.date}</p>
    </div>
  );
};
export default Task;
