import { FormEvent, useContext, useState } from "react";
import {
  dayOfMoveTasks,
  packingTasks,
  postMoveTasks,
  preMovePlanningTasks,
  utilityAdminTasks,
} from "../../Utilities/SuggestedTasksData";
import "./SuggestedTasks.css";
import { addNewTask, getAccountById } from "../../services/accountApi";
import { Task } from "../../models/Account";
import AuthContext from "../../context/AuthContext";

const SuggestedTasks = () => {
  const { account, setAccount } = useContext(AuthContext);

  const [showPreMove, setShowPreMove] = useState(false);
  const [showPacking, setShowPacking] = useState(false);
  const [showDayOfMove, setShowDayOfMove] = useState(false);
  const [showPostMove, setShowPostMove] = useState(false);
  const [showUtilityAdmin, setShowUtilityAdmin] = useState(false);

  const submitHandler = async (e: FormEvent, newTask: Task) => {
    e.preventDefault();
    if (account) {
      console.log(newTask);

      await addNewTask(account.uid, newTask);
      const updatedAccount = await getAccountById(account.uid);
      if (updatedAccount) {
        setAccount(updatedAccount);
      }
    }
  };

  return (
    <div className="SuggestedTasks">
      <h2>Task Suggestions</h2>
      <ul>
        <h3 onClick={() => setShowPreMove((prev) => !prev)}>
          Pre-Move Planning{" "}
          <span className={showPreMove ? "flipUpsideDown" : ""}>▼</span>
        </h3>
        {showPreMove &&
          preMovePlanningTasks.map((task) => (
            <li key={task.uuid}>
              <p>{task.name}</p>
              <p>{task.content}</p>
              <form onSubmit={(e) => submitHandler(e, task)}>
                <label htmlFor={task.uuid}>Deadline</label>
                <input className="deadline-input" type="date" id={task.uuid} />
                <button>Add Task</button>
              </form>
            </li>
          ))}
      </ul>
      <ul>
        <h3 onClick={() => setShowPacking((prev) => !prev)}>
          Packing <span className={showPacking ? "flipUpsideDown" : ""}>▼</span>
        </h3>
        {showPacking &&
          packingTasks.map((task) => (
            <li key={task.uuid}>
              <p>{task.name}</p>
              <p>{task.content}</p>
              <form onSubmit={(e) => submitHandler(e, task)}>
                <label htmlFor={task.uuid}>Deadline</label>
                <input className="deadline-input" type="date" id={task.uuid} />
                <button>Add Task</button>
              </form>
            </li>
          ))}
      </ul>
      <ul>
        <h3 onClick={() => setShowDayOfMove((prev) => !prev)}>
          Day of Move{" "}
          <span className={showDayOfMove ? "flipUpsideDown" : ""}>▼</span>
        </h3>
        {showDayOfMove &&
          dayOfMoveTasks.map((task) => (
            <li key={task.uuid}>
              <p>{task.name}</p>
              <p>{task.content}</p>
              <form onSubmit={(e) => submitHandler(e, task)}>
                <label htmlFor={task.uuid}>Deadline</label>
                <input className="deadline-input" type="date" id={task.uuid} />
                <button>Add Task</button>
              </form>
            </li>
          ))}
      </ul>
      <ul>
        <h3 onClick={() => setShowPostMove((prev) => !prev)}>
          Post-Move{" "}
          <span className={showPostMove ? "flipUpsideDown" : ""}>▼</span>
        </h3>
        {showPostMove &&
          postMoveTasks.map((task) => (
            <li key={task.uuid}>
              <p>{task.name}</p>
              <p>{task.content}</p>
              <form onSubmit={(e) => submitHandler(e, task)}>
                <label htmlFor={task.uuid}>Deadline</label>
                <input className="deadline-input" type="date" id={task.uuid} />
                <button>Add Task</button>
              </form>
            </li>
          ))}
      </ul>
      <ul>
        <h3 onClick={() => setShowUtilityAdmin((prev) => !prev)}>
          Utility and Administration{" "}
          <span className={showUtilityAdmin ? "flipUpsideDown" : ""}>▼</span>
        </h3>
        {showUtilityAdmin &&
          utilityAdminTasks.map((task) => (
            <li key={task.uuid}>
              <p>{task.name}</p>
              <p>{task.content}</p>
              <form onSubmit={(e) => submitHandler(e, task)}>
                <label htmlFor={task.uuid}>Deadline</label>
                <input type="date" id={task.uuid} />
                <button>Add Task</button>
              </form>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SuggestedTasks;
