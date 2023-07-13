import Task from './Task'

const Tasks = ({tasks, deleteTask, toggleReminder}) => {
  return (
    <div className="hollidayContainer">
      {tasks.map((task)=>(
        <Task 
        key={task.id}
        task={task}
        deleteTask={deleteTask}
        toggleReminder={toggleReminder}
        />
      ))}
    </div>
  )
}
export default Tasks