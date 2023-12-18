import { useContext, useEffect, useState } from "react";
import "./Tasks.css";
import AuthContext from "../../context/AuthContext";
import TaskForm from "../TaskForm/TaskForm";
import {
  getAccountById,
  removeTask,
  updateTask,
} from "../../services/accountApi";
import SuggestedTasks from "../SuggestedTasks/SuggestedTasks";
import { Link, useNavigate } from "react-router-dom";
import { Task } from "../../models/Account";

const Tasks = () => {
  const { account, user, setAccount } = useContext(AuthContext);
  const [showProgressList, setShowProgressList] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user) {
      navigate("/");
    }
  }, [user]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // -------------------------------------------------------

  const handleRemoveTask = (uuid: string) => {
    if (account) {
      removeTask(uuid, account.uid).then(() => {
        getAccountById(account.uid).then((response) => {
          if (response) {
            setAccount(response);
          }
        });
      });
    }
  };

  const handleTaskStatus = (task: Task, status: boolean) => {
    const updatedTask = { ...task, completed: status };
    if (account) {
      updateTask(account.uid, task.uuid, updatedTask).then((res) => {
        if (res) {
          getAccountById(account.uid).then((response) => {
            if (response) {
              setAccount(response);
            }
          });
        }
      });
    }
  };

  return (
    <div className="Tasks">
      <div className="tasks-header">
        <h3>My Tasks</h3>
        <nav>
          <button>
            <Link to="/calendar">View in Calendar📅</Link>
          </button>
        </nav>
      </div>

      <div className="filterBtnContainer">
        <button
          className={showProgressList ? `isActive` : ""}
          onClick={() => setShowProgressList(true)}
        >
          In Progress
        </button>
        <button
          className={!showProgressList ? `isActive` : ""}
          onClick={() => setShowProgressList(false)}
        >
          Finished
        </button>
      </div>

      <ul>
        {showProgressList &&
          account &&
          account.tasks
            .sort((a, b) => {
              // SORTING BY WHATEVER IS DUE NEXT
              return (
                new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
              );
            })
            .filter((task) => !task.completed)
            .map((task) => (
              <li key={task.uuid}>
                <div className="list-content">
                  <h4>{task.name}</h4>
                  <p>{task.content}</p>
                  <div className="bottom-of-list-item">
                    <button onClick={() => handleTaskStatus(task, true)}>
                      &#9989;
                    </button>
                    <p>Deadline: {task.deadline}</p>
                  </div>

                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => handleRemoveTask(task.uuid)}
                  ></i>
                </div>
              </li>
            ))}
      </ul>
      <ul>
        {!showProgressList &&
          account &&
          account.tasks
            .sort((a, b) => {
              // SORTING BY WHATEVER IS DUE NEXT
              return (
                new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
              );
            })
            .filter((task) => task.completed)
            .map((task) => (
              <li key={task.uuid}>
                <div className="list-content">
                  <h4>{task.name}</h4>
                  <p>{task.content}</p>
                  <div className="bottom-of-list-item">
                    <button onClick={() => handleTaskStatus(task, false)}>
                      Remove
                    </button>
                    <p>Deadline: {task.deadline}</p>
                  </div>

                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => handleRemoveTask(task.uuid)}
                  ></i>
                </div>
              </li>
            ))}
      </ul>
      {showTaskForm && <TaskForm setShowTaskForm={setShowTaskForm} />}
      {!showTaskForm && (
        <button onClick={() => setShowTaskForm((prev) => !prev)}>
          Create a new task
        </button>
      )}

      <SuggestedTasks />
    </div>
  );
};

export default Tasks;
