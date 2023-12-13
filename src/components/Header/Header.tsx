import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../../firebaseConfig";
import "./Header.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="Header">
      <Link to="/dashboard">
        <h1>CargoCompanion</h1>
      </Link>
      {user ? (
        <button onClick={signOut}>sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      )}
    </header>
  );
};

export default Header;
