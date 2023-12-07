import { useContext } from "react";
import "./SignIn.css";
import AuthContext from "../../context/AuthContext";
import { signInWithGoogle } from "../../firebaseConfig";

const SignIn = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="SignIn">
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
