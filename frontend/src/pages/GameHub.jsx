import React from "react";
import FenetreRetro from "../components/FenetreRetro";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Actualites from "./Actualites";

function GameHub() {
  return (
    <FenetreRetro 
      title="Jeu : Périphérie"
      tabs={[
        { label: "Dashboard", content: <Dashboard /> },
        { label: "Actualités", content: <Actualites /> },
        { label: "Paramètres", content: <Settings /> },
      ]}
    />
  );
}

export default GameHub;