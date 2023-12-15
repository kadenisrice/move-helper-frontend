import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import MyCalendar from "../Calendar/MyCalendar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { getAllTips } from "../../services/tipsApi";
import Tip from "../../models/Tip";

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

      setRecentTips(temp);
    });
  }, []);

  return (
    <div className="Dashboard">
      <nav className="main-nav">
        <Link to={"/tasks"}>Tasks</Link>
        <Link to={"/cost-estimate"}>Cost Estimate</Link>
        <Link to={"/community-tips"}>Community Tips</Link>
        <Link to={"/calendar"}>Calendar</Link>
      </nav>

      <div className="dashboard-display">
        <h2>Dashboard:</h2>

        <div className="tasks-tips">
          <Link to="/tasks">
            <div className="mini-tasks mini-display">
              <h3>Next Tasks:</h3>
              {account && account.tasks[0] ? (
                <ul>
                  {account?.tasks
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
            <MyCalendar />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
