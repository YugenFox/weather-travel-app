import { TiDelete } from "react-icons/ti";

const Task = ({ task, deleteTask, toggleReminder }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        {task.title}
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
