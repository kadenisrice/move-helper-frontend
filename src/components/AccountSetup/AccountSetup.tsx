import { useContext, useEffect, useState } from "react";
import "./AccountSetup.css";
import AuthContext from "../../context/AuthContext";
import AccountForm from "../AccountForm/AccountForm";
import { useNavigate } from "react-router-dom";

import dogInABox from "../../assets/photo-1520038410233-7141be7e6f97.avif";
import movingTruck1 from "../../assets/photo-1600518464441-9154a4dea21b.avif";
import movingTruck2 from "../../assets/photo-1601656125693-aac12521664f.avif";
import boxes from "../../assets/photo-1624137527136-66e631bdaa0e.avif";

const AccountSetup = () => {
  const { user, account } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setShowForm(true);
    }
    if (account && user && account.toAddress.state) {
      setShowForm(false);
      navigate("/dashboard");
    }
  }, [user, account]);

  return (
    <div className="AccountSetup">
      {showForm && <AccountForm setShowForm={setShowForm} />}

      <div className="landing-page">
        <div className="stock-photos">
          <img src={dogInABox} alt="dog in a box" />
          <img src={movingTruck1} alt="moving truck people" />
          <img src={movingTruck2} alt="friends with moving truck" />
          <img src={boxes} alt="boxes" />
        </div>
      </div>
    </div>
  );
};

export default AccountSetup;
