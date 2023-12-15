import { FormEvent, useContext, useState } from "react";
import "./TaskForm.css";
import { addNewTask, getAccountById } from "../../services/accountApi";
import AuthContext from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setShowTaskForm?: (e: boolean) => void;
  close?: () => void;
  clickedDate?: Date | null;
}

const TaskForm = ({ setShowTaskForm, close, clickedDate }: Props) => {
  const { account, setAccount } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState(
    clickedDate?.toISOString().slice(0, 10) ?? ""
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newTask = {
      uuid: uuidv4(),
      name,
      content,
      deadline,
      completed: false,
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
    if (setShowTaskForm) {
      setShowTaskForm(false);
    }
  };

  return (
    <form className="TaskForm" onSubmit={(e) => handleSubmit(e)}>
      {setShowTaskForm && (
        <button onClick={() => setShowTaskForm(false)}>close</button>
      )}
      {close && <button onClick={close}>close</button>}

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
