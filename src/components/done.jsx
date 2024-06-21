import User from "../assets/user-01.png";
import TasksData from "../data/tasks.json";

function Done() {
  const doneTasks = TasksData.tasks.filter(
    (task) => task.status === "in-progress"
  );

  return (
    <>
      <div className="board-task-item-title done">
        <h4>Done</h4>
        <span className="material-symbols-outlined">add</span>
      </div>
      {doneTasks.map((task) => (
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

export default Done;
