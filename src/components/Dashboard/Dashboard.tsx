import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <p>dashboard werks</p>
      <Link to={"/tasks"}>Tasks</Link>
      <Link to={"/cost-estimate"}>Cost Estimate</Link>
      <Link to={"/community-tips"}>Community Tips</Link>
    </div>
  );
};

export default Dashboard;
