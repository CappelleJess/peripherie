import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext"; 
import "./styles/style.css";
import './tailwind.css';

/**
 * Point d’entrée de l’application.
 * BrowserRouter est placé ici une seule fois autour de toute l'app.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>  {/* ← englober toute l'app avec le provider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);