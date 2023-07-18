import Task from './Task'

const Tasks = ({tasks, deleteTask, toggleReminder}) => {
  return (
    <div className='tasks'>
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