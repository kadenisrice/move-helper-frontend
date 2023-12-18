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
import { useNavigate } from "react-router-dom";
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
      <h3>Tasks</h3>
      <button onClick={() => setShowTaskForm((prev) => !prev)}>
        Create a new task
      </button>
      {showTaskForm && <TaskForm setShowTaskForm={setShowTaskForm} />}
      <button onClick={() => setShowProgressList(true)}>In Progress</button>
      <button onClick={() => setShowProgressList(false)}>Finished</button>
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
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => handleRemoveTask(task.uuid)}
                ></i>
                <div className="list-content">
                  <p>{task.name}</p>
                  <p>{task.content}</p>
                  <p>{task.deadline}</p>
                  <button onClick={() => handleTaskStatus(task, true)}>
                    &#9989;
                  </button>
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
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => handleRemoveTask(task.uuid)}
                ></i>
                <div className="list-content">
                  <p>{task.name}</p>
                  <p>{task.content}</p>
                  <p>{task.deadline}</p>
                  <p>Complete</p>
                  <button onClick={() => handleTaskStatus(task, false)}>
                    &#10006;
                  </button>
                </div>
              </li>
            ))}
      </ul>
      <SuggestedTasks />
    </div>
  );
};

export default Tasks;
