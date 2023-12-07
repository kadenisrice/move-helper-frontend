import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SignIn from "./components/SignIn/SignIn";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
