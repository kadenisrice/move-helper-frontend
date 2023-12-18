import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContextProvider.tsx";
import UhaulContextProvider from "./context/UhaulContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UhaulContextProvider>
        <App />
      </UhaulContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
