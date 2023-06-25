import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const taskData = getTasksFromLocalStorage();
    setTasks(taskData);
  }, []);

  const getTasksFromLocalStorage = () => {
    const tasksData = localStorage.getItem("tasks");
    return tasksData ? JSON.parse(tasksData) : [];
  };

  const saveTasksToLocalStorage = (tasksData) => {
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  };

  const addTask = (title, date, reminder) => {
    const newTask = {
      title: title,
      date: date,
      reminder: reminder,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleReminder = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, reminder: !task.reminder };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <Router>
      <div className="container">
        <Header
          changeShowAddTask={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTasks addTask={addTask} />}
                {tasks.length <= 0 ? (
                  <p style={{ color: "steelblue" }}>
                    No more tasks left, maybe add some!
                  </p>
                ) : (
                  <Tasks
                    tasks={tasks}
                    deleteTask={deleteTask}
                    toggleReminder={toggleReminder}
                  />
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
