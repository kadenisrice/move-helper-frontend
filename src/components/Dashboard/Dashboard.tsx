import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <p>dashboard werks</p>
      <Link to={"/tasks"}>Tasks</Link>
    </div>
  );
};

export default Dashboard;
