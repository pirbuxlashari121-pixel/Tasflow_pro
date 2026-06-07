import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { CSVLink } from "react-csv";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [editingText, setEditingText] =
    useState("");

  // FETCH TASKS

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    const res = await axios.get(
      "http://localhost:5001/api/tasks"
    );

    setTasks(res.data);
  };

  // ADD TASK

  const addTask = async () => {

    if (!title.trim()) {

      toast.warning(
        "Please enter a task"
      );

      return;
    }

    // DUPLICATE CHECK

    const duplicateTask = tasks.find(

      (task) =>

        task.title.toLowerCase().trim() ===
        title.toLowerCase().trim()
    );

    if (duplicateTask) {

      toast.error(
        "Task already exists"
      );

      return;
    }

    try {

      setLoading(true);

      await axios.post(
        "http://localhost:5001/api/tasks",
        {
          title,
        }
      );

      toast.success(
        "Task Added Successfully"
      );

      setTitle("");

      fetchTasks();

    } catch (error) {

      toast.error(
        "Failed to add task"
      );

    } finally {

      setLoading(false);
    }
  };

  // DELETE TASK

  const deleteTask = async (id) => {

    await axios.delete(
      `http://localhost:5001/api/tasks/${id}`
    );

    toast.error("Task Deleted");

    fetchTasks();
  };

  // UPDATE TASK

  const updateTask = async (id) => {

    if (!editingText.trim()) {

      toast.warning(
        "Task cannot be empty"
      );

      return;
    }

    await axios.put(
      `http://localhost:5001/api/tasks/edit/${id}`,
      {
        title: editingText,
      }
    );

    toast.info(
      "Task Updated"
    );

    setEditingId(null);

    setEditingText("");

    fetchTasks();
  };

  // TOGGLE COMPLETE

  const toggleComplete = async (id) => {

    await axios.put(
      `http://localhost:5001/api/tasks/${id}`
    );

    toast.success(
      "Task Status Updated"
    );

    fetchTasks();
  };

  return (

    <>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />

      <div className="container">

        {/* HEADER */}

        <div className="header">

          <h1>🚀 TaskFlow Pro</h1>

          <p>
            Professional Task Manager
            with MongoDB & CSV Export
            <br />
            By G.Zain-Ul-Abidin, Pir Bux
          </p>

        </div>

        {/* STATS */}

        <div className="stats-container">

          <div className="stat-card">

            <h3>Total Tasks</h3>

            <p>
              {tasks.length}
            </p>

          </div>

          <div className="stat-card completed-card">

            <h3>Completed</h3>

            <p>
              {
                tasks.filter(
                  (task) => task.completed
                ).length
              }
            </p>

          </div>

          <div className="stat-card pending-card">

            <h3>Pending</h3>

            <p>
              {
                tasks.filter(
                  (task) => !task.completed
                ).length
              }
            </p>

          </div>

        </div>

        {/* ADD TASK */}

        <div className="task-box">

          <h2>Add New Task</h2>

          <div className="input-group">

            <input
              type="text"
              placeholder="Enter task..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <button
              onClick={addTask}
              disabled={loading}
            >

              {
                loading
                  ? "Saving..."
                  : "Add Task"
              }

            </button>

          </div>

        </div>

        {/* TASK LIST */}

        <div className="task-list">

          <div className="task-header">

            <h2>Tasks</h2>

            <CSVLink
              data={tasks}
              filename="tasks.csv"
              className="export-btn"
            >
              Export CSV
            </CSVLink>

          </div>

          {tasks.length === 0 ? (

            <p className="empty">
              No tasks added yet.
            </p>

          ) : (

            tasks.map((task) => (

              <div
                className={`task-item ${
                  task.completed
                    ? "completed"
                    : ""
                }`}
                key={task._id}
              >

                {editingId === task._id ? (

                  <div className="edit-group">

                    <input
                      value={editingText}
                      onChange={(e) =>
                        setEditingText(
                          e.target.value
                        )
                      }
                    />

                    <button
                      className="save-btn"
                      onClick={() =>
                        updateTask(task._id)
                      }
                    >
                      Save
                    </button>

                  </div>

                ) : (

                  <>


                      <div className="task-left">

                      <button
                      className="complete-btn"
                      onClick={() =>
                      toggleComplete(task._id)
                      }
                      >
                      {
      task.completed
        ? "✔"
        : "○"
    }
  </button>

  <span>
    {task.title}
  </span>

</div>



                    <div className="task-buttons">

                      <button
                        className="edit-btn"
                        onClick={() => {

                          setEditingId(
                            task._id
                          );

                          setEditingText(
                            task.title
                          );
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteTask(task._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </>

                )}

              </div>

            ))

          )}

        </div>

      </div>

    </>

  );
}

export default App;

