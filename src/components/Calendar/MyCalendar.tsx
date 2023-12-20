import "./MyCalendar.css";
import { Calendar, momentLocalizer, Event, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import CSS for the calendar
import { FormEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { getAccountById, updateTask } from "../../services/accountApi";
import { Task } from "../../models/Account";
import { useNavigate } from "react-router-dom";
import TaskForm from "../TaskForm/TaskForm";

const localizer = momentLocalizer(moment);

interface MyEvent extends Event {
  title: string;
  description: string;
  uuid: string;
}

interface Props {
  isMiniView?: boolean;
}

const MyCalendar = ({ isMiniView }: Props) => {
  const [event, setEvent] = useState<MyEvent | null>(null);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [clickedDate, setClickedDate] = useState<Date | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { account, user, setAccount } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user || !account.toAddress.state) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (event) {
      setName(event.title);
      setDescription(event.description);
    }
  }, [event]);

  const tasksAsMyEvent: MyEvent[] = [];

  if (account) {
    account.tasks
      .filter((task) => !task.completed)
      .forEach((task) => {
        const dateArray = task.deadline.split("-");
        const newTask = {
          title: task.name,
          description: task.content,
          start: new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]),
          end: new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]),
          uuid: task.uuid,
        };

        tasksAsMyEvent.push(newTask);
      });
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (account && event && event.start) {
      const updatedTask: Task = {
        uuid: event.uuid,
        name,
        content: description,
        deadline: event.start.toISOString().slice(0, 10),
        completed: false,
      };
      updateTask(account.uid, event.uuid, updatedTask).then((res) => {
        if (res) {
          getAccountById(account.uid).then((response) => {
            if (response) {
              setAccount(response);
            }
          });
        }
      });
      setShowEditForm(false);
      setEvent(null);
    }
  };

  const myEventsList: MyEvent[] = tasksAsMyEvent;

  const handleClickDay = (e: SlotInfo) => {
    setShowAddForm(true);
    const date = e.slots[0];
    setClickedDate(date);
  };

  const close = (): void => {
    setShowAddForm(false);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <div
      className={`Calendar ${!isMiniView ? "not-mini" : ""}`}
      style={isMiniView ? { marginTop: "0px", boxSizing: "border-box" } : {}}
    >
      {!isMiniView && (
        <h2 style={{ textAlign: "center", fontSize: "50px" }}>
          {formattedDate}
        </h2>
      )}
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        views={!isMiniView ? ["month", "agenda"] : ["month"]}
        onSelectEvent={(e) => setEvent(e)}
        onSelectSlot={handleClickDay}
        selectable
        toolbar={!isMiniView}
        className={!isMiniView ? "main-calendar" : "main-calendar-mini"}
      />

      {event && (
        <div className="eventContainer">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <div>
            <button
              onClick={() => {
                setEvent(null);
                setShowEditForm(false);
              }}
            >
              Close
            </button>
            <button onClick={() => setShowEditForm((prev) => !prev)}>
              Edit
            </button>
          </div>

          {showEditForm && (
            <form className="edit-form" onSubmit={(e) => submitHandler(e)}>
              <label htmlFor="name">Task: </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="description">Description: </label>
              <textarea
                name="description"
                id="description"
                cols={30}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button>Submit Edit</button>
            </form>
          )}
        </div>
      )}
      {showAddForm && (
        <div className="addFormContainer">
          {showAddForm && <TaskForm close={close} clickedDate={clickedDate} />}
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
