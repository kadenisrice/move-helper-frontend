import { FormEvent, useContext, useState } from "react";
import "./TaskForm.css";
import { addNewTask, getAccountById } from "../../services/accountApi";
import AuthContext from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setShowTaskForm: (e: boolean) => void;
}

const TaskForm = ({ setShowTaskForm }: Props) => {
  const { account, setAccount } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newTask = {
      uuid: uuidv4(),
      name,
      content,
      deadline,
    };

    // if account exists then we add new task:
    if (account) {
      addNewTask(account.uid, newTask).then(() => {
        getAccountById(account.uid).then((response) => {
          if (response) {
            setAccount(response);
          }
        });
      });
    }

    setShowTaskForm(false);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <button onClick={() => setShowTaskForm(false)}>close</button>

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="content">Content:</label>
      <input
        type="text"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <label htmlFor="deadline">Deadline:</label>
      <input
        type="date"
        id="deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">Submit Task</button>
    </form>
  );
};

export default TaskForm;
