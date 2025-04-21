import React from "react";
import FenetreRetro from "../components/FenetreRetro";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const onglets = [
    {
      label: "Terminal",
      content: (
        <>
          <h2>Bienvenue, {user?.username || user?.email}</h2>
          <p>Score actuel : {user?.score || 0}</p>
        </>
      ),
    },
    {
      label: "Paramètres",
      content: <p>Fonctionnalité à venir...</p>,
    },
  ];

  return <FenetreRetro title="Interface Périphérique" tabs={onglets} />;
}

export default Dashboard;
