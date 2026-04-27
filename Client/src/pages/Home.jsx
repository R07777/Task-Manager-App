import { useEffect, useState } from "react";
import API from "../api";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const addTask = async () => {
    if (!title) return alert("Enter task");

    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const updateTask = async (id) => {
    const newTitle = prompt("Enter new title:");
    if (!newTitle) return;

    try {
      await API.put(`/tasks/${id}`, { title: newTitle });
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        fontFamily: "Arial"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Task Manager</h2>

      {/* Logout */}
      <button
        onClick={logout}
        style={{
          marginBottom: "15px",
          padding: "8px",
          width: "100%"
        }}
      >
        Logout
      </button>

      {/* Add Task */}
      <div style={{ display: "flex", gap: "5px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          style={{
            flex: 1,
            padding: "8px"
          }}
        />

        <button onClick={addTask} style={{ padding: "8px 12px" }}>
          Add
        </button>
      </div>

      {/* Task List */}
      <div style={{ marginTop: "20px" }}>
        {tasks.length === 0 ? (
          <p style={{ textAlign: "center" }}>No tasks yet</p>
        ) : (
          tasks.map((t) => (
            <div
              key={t._id}
              style={{
                marginTop: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            >
              <strong>{t.title}</strong>

              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  gap: "10px"
                }}
              >
                <button onClick={() => updateTask(t._id)}>
                  Edit
                </button>
                <button onClick={() => deleteTask(t._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}