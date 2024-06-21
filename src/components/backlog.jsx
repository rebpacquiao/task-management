import { useState, useEffect } from "react";
import User from "../assets/user-01.png";
import TasksData from "../data/tasks.json";

function Backlog() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [notes, setNotes] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedTasks =
      JSON.parse(localStorage.getItem("tasks")) || TasksData.tasks;
    setTasks(storedTasks.filter((task) => task.status === "back-log"));
  }, []);

  const handleInputChange = (e, setter) => setter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      title: "Backlog",
      description,
      status: "back-log",
      dueDate,
      priority,
      notes,
      assignedTo: {
        name: "User",
        image: User,
      },
    };

    const updatedTasks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setDescription("");
    setDueDate("");
    setPriority("low");
    setNotes("");
    setShowForm(false);
  };

  return (
    <>
      <div className="board-task-item-title back-log">
        <h4>Backlog</h4>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="board-task-item-card">
            <div className="user-task">
              <input
                type="text"
                name="description"
                placeholder="enter-description"
                value={description}
                onChange={(e) => handleInputChange(e, setDescription)}
              />
            </div>
            <div className="task-status">
              <span className="card-status-item">
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={dueDate}
                  onChange={(e) => handleInputChange(e, setDueDate)}
                />
              </span>
              <span className="card-status-item">
                <select
                  name="priority"
                  value={priority}
                  onChange={(e) => handleInputChange(e, setPriority)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </span>
              <textarea
                id="text-area"
                name="notes"
                placeholder="add notes"
                value={notes}
                onChange={(e) => handleInputChange(e, setNotes)}
              ></textarea>
              <div className="task-submit">
                <button
                  className="save-btn"
                  type="submit"
                  disabled={!description.trim()}
                >
                  Save
                </button>
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      {tasks.map((task) => (
        <div key={task.id} className="board-task-item-card">
          <div className="user-task-continer">
            <h5>{task.description}</h5>
            <img
              width="30"
              height="30"
              src={User}
              alt="user"
              className="user-image"
            />
          </div>
          <div className="card-status">
            <span className="card-status-item">{task.status}</span>
            <span className="card-status-item">{task.dueDate}</span>
            <span className="card-status-item">{task.priority}</span>
          </div>
          <div className="meeting-notes">
            <p>{task.notes}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Backlog;
