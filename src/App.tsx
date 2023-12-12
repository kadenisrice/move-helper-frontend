import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Tasks from "./components/Tasks/Tasks";
import CostEstimate from "./components/CostEstimate/CostEstimate";
import AccountSetup from "./components/AccountSetup/AccountSetup";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AccountSetup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
        <Route path="/cost-estimate" element={<CostEstimate />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
