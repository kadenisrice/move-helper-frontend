import { Link } from "react-router-dom";
import AccountForm from "../AccountForm/AccountForm";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <p>dashboard werks</p>
      <Link to={"/tasks"}>Tasks</Link>

      <AccountForm />
    </div>
  );
};

export default Dashboard;
