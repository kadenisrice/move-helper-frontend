import { Link } from "react-router-dom";
import { signOut } from "../../firebaseConfig";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/dashboard">
        <h1>MoveHelper</h1>
      </Link>
      <button onClick={signOut}>sign out</button>
    </header>
  );
};

export default Header;
