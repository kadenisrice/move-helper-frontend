import { Link } from "react-router-dom";
import "./MainNavigation.css";
import { signOut } from "../../firebaseConfig";

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
        <Link to={"/tasks"}>
          <li onClick={() => setShowMainNav(false)}>Tasks</li>
        </Link>

        <li onClick={() => setShowMainNav(false)}>
          <Link to={"/cost-estimate"}>Cost Estimate</Link>
        </li>
        <li onClick={() => setShowMainNav(false)}>
          <Link to={"/calendar"}>Calendar</Link>
        </li>
        <li onClick={() => setShowMainNav(false)}>
          <Link to={"/community-tips"}>Community Tips</Link>
        </li>
        <li onClick={() => setShowMainNav(false)}>
          <button onClick={signOut}>sign out</button>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
