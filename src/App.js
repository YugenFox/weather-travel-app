import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
//uuid ensures a unique ID, used in addTask implementing uuidv4 function
import { v4 as uuidv4 } from "uuid";

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

  const addTask = (
    address,
    reminder,
    geoCoordinates,
    weatherData,
    startDate,
    endDate,
    startDateIndex,
    endDateIndex
  ) => {
    const newTask = {
      id: uuidv4(),
      address: address,
      reminder: reminder,
      geoCoordinates: geoCoordinates,
      weatherData: weatherData,
      startDate: startDate,
      endDate: endDate,
      startDateIndex: startDateIndex,
      endDateIndex: endDateIndex,
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
    //commented out Task Reminder in AddTasks which makes this work, without value .reminder to change or see nothing happens on double click
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
                    No more travel locations left, maybe add some!
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
