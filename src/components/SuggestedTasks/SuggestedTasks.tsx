import { FormEvent, useContext, useState } from "react";
import {
  dayOfMoveTasks,
  packingTasks,
  postMoveTasks,
  preMovePlanningTasks,
  utilityAdminTasks,
} from "../../utilities/SuggestedTasksData";
import "./SuggestedTasks.css";
import { addNewTask, getAccountById } from "../../services/accountApi";
import { Task } from "../../models/Account";
import AuthContext from "../../context/AuthContext";

const SuggestedTasks = () => {
  const { account, setAccount, user } = useContext(AuthContext);

  const [showPreMove, setShowPreMove] = useState(false);
  const [showPacking, setShowPacking] = useState(false);
  const [showDayOfMove, setShowDayOfMove] = useState(false);
  const [showPostMove, setShowPostMove] = useState(false);
  const [showUtilityAdmin, setShowUtilityAdmin] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState("");

  const [preMoveDeadline, setPreMoveDeadline] = useState("");
  const [packingDeadline, setPackingDeadline] = useState("");
  const [dayOfMoveDeadline, setDayOfMoveDeadline] = useState("");
  const [postMoveDeadline, setPostMoveDeadline] = useState("");
  const [utilityAdminDeadline, setUtilityAdminDeadline] = useState("");

  const getDeadlineForSelectedTask = (): string => {
    if (preMovePlanningTasks.some((task) => task.uuid === selectedIndex)) {
      return preMoveDeadline;
    } else if (packingTasks.some((task) => task.uuid === selectedIndex)) {
      return packingDeadline;
    } else if (dayOfMoveTasks.some((task) => task.uuid === selectedIndex)) {
      return dayOfMoveDeadline;
    } else if (postMoveTasks.some((task) => task.uuid === selectedIndex)) {
      return postMoveDeadline;
    } else if (utilityAdminTasks.some((task) => task.uuid === selectedIndex)) {
      return utilityAdminDeadline;
    }
    return "";
  };

  const submitHandler = async (e: FormEvent, newTask: Task) => {
    e.preventDefault();
    if (user && account) {
      newTask.deadline = getDeadlineForSelectedTask();
      await addNewTask(user.uid, newTask);
      const updatedAccount = await getAccountById(user.uid);
      if (updatedAccount) {
        setAccount(updatedAccount);
      }
    }

    setSelectedIndex("");
  };

  return (
    <div className="SuggestedTasks">
      <h2>Quick-Start Your Move: Select from Pre-Made Tasks!</h2>
      <ul>
        <h3 onClick={() => setShowPreMove((prev) => !prev)}>
          Pre-Move Planning{" "}
          <span className={showPreMove ? "flipUpsideDown" : ""}>▼</span>
        </h3>
        {showPreMove &&
          preMovePlanningTasks.map((task) => (
            <li key={task.uuid}>
              <p className="suggested-title">{task.name}</p>
              <p>{task.content}</p>

              {selectedIndex === task.uuid ? (
                <form onSubmit={(e) => submitHandler(e, task)}>
                  {" "}
                  <label htmlFor={task.uuid}>Deadline</label>
                  <input
                    className="deadline-input"
                    type="date"
                    id={task.uuid}
                    value={preMoveDeadline}
                    required
                    onChange={(e) => setPreMoveDeadline(e.target.value)}
                  />
                  <button>Add Task</button>
                </form>
              ) : (
                <button
                  onClick={() => {
                    setSelectedIndex(task.uuid);
                  }}
                >
                  Create Task
                </button>
              )}
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
              <p className="suggested-title">{task.name}</p>
              <p>{task.content}</p>

              {selectedIndex === task.uuid ? (
                <form onSubmit={(e) => submitHandler(e, task)}>
                  {" "}
                  <label htmlFor={task.uuid}>Deadline</label>
                  <input
                    className="deadline-input"
                    type="date"
                    id={task.uuid}
                    value={packingDeadline}
                    required
                    onChange={(e) => setPackingDeadline(e.target.value)}
                  />
                  <button>Add Task</button>
                </form>
              ) : (
                <button
                  onClick={() => {
                    setSelectedIndex(task.uuid);
                  }}
                >
                  Create Task
                </button>
              )}
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
              <p className="suggested-title">{task.name}</p>
              <p>{task.content}</p>

              {selectedIndex === task.uuid ? (
                <form onSubmit={(e) => submitHandler(e, task)}>
                  {" "}
                  <label htmlFor={task.uuid}>Deadline</label>
                  <input
                    className="deadline-input"
                    type="date"
                    id={task.uuid}
                    value={dayOfMoveDeadline}
                    required
                    onChange={(e) => setDayOfMoveDeadline(e.target.value)}
                  />
                  <button>Add Task</button>
                </form>
              ) : (
                <button
                  onClick={() => {
                    setSelectedIndex(task.uuid);
                  }}
                >
                  Create Task
                </button>
              )}
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
              <p className="suggested-title">{task.name}</p>
              <p>{task.content}</p>

              {selectedIndex === task.uuid ? (
                <form onSubmit={(e) => submitHandler(e, task)}>
                  {" "}
                  <label htmlFor={task.uuid}>Deadline</label>
                  <input
                    className="deadline-input"
                    type="date"
                    id={task.uuid}
                    value={postMoveDeadline}
                    required
                    onChange={(e) => setPostMoveDeadline(e.target.value)}
                  />
                  <button>Add Task</button>
                </form>
              ) : (
                <button
                  onClick={() => {
                    setSelectedIndex(task.uuid);
                  }}
                >
                  Create Task
                </button>
              )}
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
              <p className="suggested-title">{task.name}</p>
              <p>{task.content}</p>

              {selectedIndex === task.uuid ? (
                <form onSubmit={(e) => submitHandler(e, task)}>
                  {" "}
                  <label htmlFor={task.uuid}>Deadline</label>
                  <input
                    className="deadline-input"
                    type="date"
                    id={task.uuid}
                    value={utilityAdminDeadline}
                    required
                    onChange={(e) => setUtilityAdminDeadline(e.target.value)}
                  />
                  <button>Add Task</button>
                </form>
              ) : (
                <button
                  onClick={() => {
                    setSelectedIndex(task.uuid);
                  }}
                >
                  Create Task
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SuggestedTasks;
