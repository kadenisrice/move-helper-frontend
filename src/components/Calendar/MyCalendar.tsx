import "./MyCalendar.css";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import CSS for the calendar
import { FormEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { updateTask } from "../../services/accountApi";
import { Task } from "../../models/Account";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

interface MyEvent extends Event {
  title: string;
  description: string;
  uuid: string;
}

const MyCalendar = () => {
  const [event, setEvent] = useState<MyEvent | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { account, user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user) {
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
    account.tasks.forEach((task) => {
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
      };
      updateTask(account.uid, event.uuid, updatedTask).then((res) =>
        console.log(res)
      );
    }
  };

  const myEventsList: MyEvent[] = tasksAsMyEvent;

  return (
    <div className="Calendar">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        views={["month", "agenda"]}
        onSelectEvent={(e) => setEvent(e)}
      />
      {event && (
        <div className="eventContainer">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <button
            onClick={() => {
              setEvent(null);
              setShowEditForm(false);
            }}
          >
            Close
          </button>
          <button onClick={() => setShowEditForm((prev) => !prev)}>Edit</button>
          {showEditForm && (
            <form onSubmit={(e) => submitHandler(e)}>
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
    </div>
  );
};

export default MyCalendar;
