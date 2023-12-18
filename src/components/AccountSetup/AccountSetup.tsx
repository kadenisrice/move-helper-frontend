import { useContext, useEffect, useState } from "react";
import "./AccountSetup.css";
import AuthContext from "../../context/AuthContext";
import AccountForm from "../AccountForm/AccountForm";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default AccountSetup;
