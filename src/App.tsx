import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SignIn from "./components/SignIn/SignIn";
import Dashboard from "./components/Dashboard/Dashboard";
import Tasks from "./components/Tasks/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
