import { useState, useEffect } from "react";
import User from "../assets/user-01.png";
import TasksData from "../data/tasks.json";

function Inprogress() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [notes, setNotes] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedTasks =
      JSON.parse(localStorage.getItem("tasks")) || TasksData.tasks;
    setTasks(storedTasks.filter((task) => task.status === "in-progress"));
  }, []);

  const handleInputChange = (e, setter) => setter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingId
          ? { ...task, description, dueDate, priority, notes }
          : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const newTask = {
        id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
        title: "In Progress",
        description,
        status: "in-progress",
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
    }

    setDescription("");
    setDueDate("");
    setPriority("low");
    setNotes("");
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (task) => {
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setNotes(task.notes);
    setShowForm(true);
    setEditingId(task.id);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <div className="board-task-item-title inprogress">
        <h4>In Progess</h4>
        <button
          className="add-btn"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
        >
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
        <div
          key={task.id}
          className="board-task-item-card"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, task)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, task)}
        >
          <div className="action-section">
            <button className="action-btn" onClick={() => handleEdit(task)}>
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button
              className="action-btn"
              onClick={() => handleDelete(task.id)}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
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
            <span className={`card-status-item ${task.status}`}>
              {task.status}
            </span>

            <span className="card-status-item">{task.dueDate}</span>
            <span className={`card-status-item ${task.priority}`}>
              {task.priority}
            </span>
          </div>
          <div className="meeting-notes">
            <p>{task.notes}</p>
          </div>
        </div>
      ))}
    </>
  );

  function handleDragStart(e, task) {
    e.dataTransfer.setData("text/plain", task.id);
  }

  function handleDrop(e, targetTask) {
    const taskId = e.dataTransfer.getData("text");
    const taskIndex = tasks.findIndex((task) => task.id.toString() === taskId);
    const targetIndex = tasks.findIndex((task) => task.id === targetTask.id);

    if (taskIndex < 0 || targetIndex < 0 || taskIndex === targetIndex) return;

    const newTasks = [...tasks];
    const [reorderedTask] = newTasks.splice(taskIndex, 1);
    newTasks.splice(targetIndex, 0, reorderedTask);

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }
}

export default Inprogress;
