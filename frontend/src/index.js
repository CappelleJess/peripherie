import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

/**
 * Point d’entrée de l’application.
 * BrowserRouter est placé ici une seule fois autour de toute l'app.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ← Ceci englobe toutes les routes */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);