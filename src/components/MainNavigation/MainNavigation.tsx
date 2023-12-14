import { Link } from "react-router-dom";
import "./MainNavigation.css";

interface Props {
  showMainNav: boolean;
  setShowMainNav: (e: boolean) => void;
}

const MainNavigation = ({ showMainNav, setShowMainNav }: Props) => {
  return (
    <nav className={`MainNavigation${showMainNav ? " NavActive" : ""}`}>
      <i
        onClick={() => setShowMainNav(false)}
        className="fa-solid fa-xmark"
      ></i>
      <ul>
        <li>
          <Link to={"/tasks"}>Tasks</Link>
        </li>
        <li>
          <Link to={"/cost-estimate"}>Cost Estimate</Link>
        </li>
        <li>
          <Link to={"/calendar"}>Calendar</Link>
        </li>
        <li>
          <Link to={"/community-tips"}>Community Tips</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
