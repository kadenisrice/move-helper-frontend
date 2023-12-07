import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SignIn from "./components/SignIn/SignIn";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <SignIn />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
