import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../../firebaseConfig";
import "./Header.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import MainNavigation from "../MainNavigation/MainNavigation";

const Header = () => {
  const { user } = useContext(AuthContext);

  const [showMainNav, setShowMainNav] = useState(false);

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
      <i onClick={() => setShowMainNav(true)} className="fa-solid fa-bars"></i>

      <MainNavigation
        showMainNav={showMainNav}
        setShowMainNav={setShowMainNav}
      />
    </header>
  );
};

export default Header;
