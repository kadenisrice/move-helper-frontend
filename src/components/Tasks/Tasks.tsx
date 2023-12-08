import { useContext, useState } from "react";
import "./Tasks.css";
import AuthContext from "../../context/AuthContext";
import TaskForm from "../TaskForm/TaskForm";
import { getAccountById, removeTask } from "../../services/accountApi";

const Tasks = () => {
  const { account, setAccount } = useContext(AuthContext);
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
          account.tasks.map((task) => (
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
    </div>
  );
};

export default Tasks;
