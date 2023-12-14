import { useContext, useEffect, useState } from "react";
import "./Tasks.css";
import AuthContext from "../../context/AuthContext";
import TaskForm from "../TaskForm/TaskForm";
import { getAccountById, removeTask } from "../../services/accountApi";
import SuggestedTasks from "../SuggestedTasks/SuggestedTasks";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const { account, user, setAccount } = useContext(AuthContext);

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

  return (
    <div className="Tasks">
      <h3>Tasks</h3>
      <button onClick={() => setShowTaskForm(true)}>Create a new task</button>
      {showTaskForm && <TaskForm setShowTaskForm={setShowTaskForm} />}
      <ul>
        {account &&
          account.tasks
            .sort((a, b) => {
              // SORTING BY WHATEVER IS DUE NEXT
              return (
                new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
              );
            })
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
                </div>
              </li>
            ))}
      </ul>
      <SuggestedTasks />
    </div>
  );
};

export default Tasks;
