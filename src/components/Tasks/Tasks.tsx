import { useContext } from "react";
import "./Tasks.css";
import AuthContext from "../../context/AuthContext";

const Tasks = () => {
  const { account } = useContext(AuthContext);

  return (
    <div className="Tasks">
      <h3>Tasks</h3>
      <button>Create a new task</button>
      <ul>
        {account &&
          account.tasks.map((task) => (
            <>
              <p>{task.name}</p>
              <p>{task.deadline}</p>
              <p>{task.content}</p>
            </>
          ))}
      </ul>
    </div>
  );
};

export default Tasks;
