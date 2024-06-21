import Backlog from "../components/backlog.jsx";
import Todo from "../components/todo.jsx";
import Inprogress from "../components/inprogress.jsx";
import Done from "../components/done.jsx";

function Board() {
  return (
    <div className="board-container">
      <div className="page-heading">
        <h1>My Project</h1>
      </div>
      <div className="board-tasks-container">
        <div className="board-task-item">
          <Backlog />
        </div>
        <div className="board-task-item">
          <Todo />
        </div>
        <div className="board-task-item">
          <Inprogress />
        </div>
        <div className="board-task-item">
          <Done />
        </div>
      </div>
    </div>
  );
}

export default Board;
