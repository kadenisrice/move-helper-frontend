import { signOut } from "../../firebaseConfig";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <h1>MoveHelper</h1>
      <button onClick={signOut}>sign out</button>
    </header>
  );
};

export default Header;
