import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../firebaseConfig";
import { createNewAccount, getAccountById } from "../services/accountApi";
import Account from "../models/Account";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  console.log(user);
  console.log(account);

  useEffect(() => {
    // useEffect to only register once at start -- firebase auth, method onauthsavecchanges, from google sign in
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      console.log(newUser); // google user
    });
  }, []);

  useEffect(() => {
    if (user) {
      console.log("New user exists");

      getAccountById(user.uid).then((res) => {
        console.log("TEST", res);

        if (res && res._id) {
          console.log("Account exists");
          setAccount(res);
        } else {
          console.log("Account does not exist");
          console.log("Test", res);

          //create them an a account
          const newAccount: Account = {
            uid: user.uid,
            displayName: user.displayName ?? "",
            email: user.email ?? "",
            phoneNumber: "",
            toAddress: "",
            fromAddress: "",
            tasks: [],
            orders: [],
            expenses: [],
          };
          createNewAccount(newAccount).then((r) => setAccount(r));
        }
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
export default AuthContextProvider;
