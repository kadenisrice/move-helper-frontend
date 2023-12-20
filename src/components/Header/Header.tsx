import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../firebaseConfig";
import "./Header.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import MainNavigation from "../MainNavigation/MainNavigation";

import cargoCompanionLogo from "../../assets/936810.png";

const Header = () => {
  const { user, account } = useContext(AuthContext);

  const [showMainNav, setShowMainNav] = useState(false);

  return (
    <header className="Header">
      <Link className="header-link" to="/dashboard">
        <h1>CargoCompanion</h1>
        <img src={cargoCompanionLogo} alt="cargo logo" />
      </Link>
      {!user && <button onClick={signInWithGoogle}>Sign In With Google</button>}

      {account && user && (
        <i
          onClick={() => setShowMainNav(true)}
          className="fa-solid fa-bars"
        ></i>
      )}

      <MainNavigation
        showMainNav={showMainNav}
        setShowMainNav={setShowMainNav}
      />
    </header>
  );
};

export default Header;
