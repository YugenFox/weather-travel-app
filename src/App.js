import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";

function App() {
  //states
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const taskData = await fetchTasks();
      setTasks(taskData);
    };
    getTasks();
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //Add Task
  const addTask = async (title, date, reminder) => {
    // const rndNumber = Math.floor(Math.random() * 10000) + 1;
    const newTask = {
      title: title,
      date: date,
      reminder: reminder,
    };

    //do POST request
    const postTask = async () => {
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      //updates local state after post
      const data = await fetchTasks();
      setTasks(data);
    };
    postTask();

    // setTasks([...tasks, newTask]);

    console.log("addTask func", newTask);
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    //set state with new data
    const data = await fetchTasks();
    setTasks(data);
    // console.log("delete task", id)
    // setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder on Task - highlight if true
  const toggleReminder = async (id) => {
    //
    let updTask = await fetchTask(id);
    updTask = { ...updTask, reminder: !updTask.reminder };
    //PUT upd reminder task
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    //set state with new data
    const data = await fetchTasks();
    setTasks(data);
    // console.log("toggle reminder on", id)
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
                {tasks <= 0 ? (
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
