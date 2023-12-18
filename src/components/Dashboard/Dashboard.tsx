import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import MyCalendar from "../Calendar/MyCalendar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { getAllTips } from "../../services/tipsApi";
import Tip from "../../models/Tip";
import { Task } from "../../models/Account";

const Dashboard = () => {
  const { account, user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user) {
      navigate("/");
    }
  }, [user]);

  const [recentTips, setRecentTips] = useState<Tip[]>([]);

  useEffect(() => {
    getAllTips().then((res) => {
      const temp = res
        .sort((a, b) => {
          // SORTING BY WHATEVER IS DUE NEXT
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .slice(0, 4);
      temp.forEach((tip) => {
        if (tip.text.length >= 40) {
          tip.text = tip.text.slice(0, 40) + "... more";
        }
      });
      setRecentTips(temp);
    });
  }, []);

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

  const getTasksForToday = (): Task[] => {
    let todaysTasks: Task[] = [];
    if (account) {
      const today = new Date();
      todaysTasks = account.tasks.filter((task) => {
        return task.deadline === today.toISOString().slice(0, 10);
      });
    }
    return todaysTasks;
  };

  return (
    <div className="Dashboard">
      <div className="dashboard-display">
        <div className="todays-date">{formattedDate}</div>

        <ul className="todays-task-list">
          <h2
            style={{
              textAlign: "center",
              textDecoration: "underline",
              marginBottom: "10px",
            }}
          >
            Today's Tasks
          </h2>
          {getTasksForToday().map((task, index) => {
            return (
              <>
                <li style={{ marginBottom: "10px" }} key={task.uuid}>
                  <p>
                    {index + 1}
                    {") "}
                    {task.name}:
                  </p>
                  <p>{task.content}</p>
                </li>
              </>
            );
          })}
        </ul>

        <div className="tasks-tips">
          <Link to="/tasks">
            <div className="mini-tasks mini-display">
              <h3>Next Tasks:</h3>
              {account && account.tasks[0] ? (
                <ul>
                  {account?.tasks
                    .filter((task) => !task.completed)
                    .sort((a, b) => {
                      // SORTING BY WHATEVER IS DUE NEXT
                      return (
                        new Date(a.deadline).getTime() -
                        new Date(b.deadline).getTime()
                      );
                    })
                    .map(
                      (task, index) =>
                        // ONLY DISPLAYING 4 TASKS
                        index <= 3 && (
                          <li key={task.uuid}>
                            <p>{task.name}</p> <p>{task.deadline}</p>
                          </li>
                        )
                    )}
                </ul>
              ) : (
                <p>Add Tasks Here!</p>
              )}
            </div>
          </Link>

          <Link to="/community-tips">
            <div className="mini-tips mini-display">
              <h3>Recent Advice:</h3>
              <ul>
                {recentTips
                  .sort((a, b) => {
                    // SORTING BY WHATEVER IS DUE NEXT
                    return (
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                  })
                  .map((tip) => {
                    return (
                      <li key={tip._id}>
                        <p>{tip.text}</p>
                        <p>- {tip.from}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Link>
        </div>

        <Link to="/calendar">
          <div className="mini-calendar mini-display">
            <MyCalendar isMiniView={true} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
