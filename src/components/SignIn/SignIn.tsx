import { useContext, useEffect, useState } from "react";
import "./SignIn.css";
import AuthContext from "../../context/AuthContext";
import { signInWithGoogle } from "../../firebaseConfig";
import AccountForm from "../AccountForm/AccountForm";

const SignIn = () => {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      setShowForm(true);
    }
  }, [user]);

  return (
    <div className="SignIn">
      {!user && <button onClick={signInWithGoogle}>Sign In With Google</button>}
      {showForm && <AccountForm setShowForm={setShowForm} />}
    </div>
  );
};

export default SignIn;
