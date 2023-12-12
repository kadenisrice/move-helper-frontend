import { useContext, useEffect, useState } from "react";
import "./AccountSetup.css";
import AuthContext from "../../context/AuthContext";
import AccountForm from "../AccountForm/AccountForm";

const AccountSetup = () => {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      setShowForm(true);
    }
  }, [user]);

  return (
    <div className="AccountSetup">
      {showForm && <AccountForm setShowForm={setShowForm} />}
    </div>
  );
};

export default AccountSetup;
