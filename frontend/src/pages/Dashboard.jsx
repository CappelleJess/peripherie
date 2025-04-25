import React from "react";
import FenetreRetro from "../components/FenetreRetro";
import { useAuth } from "../contexts/AuthContext";
import DashboardContainer from "../components/DashboardContainer";

function Dashboard() {
  const { user } = useAuth();

  return (
    <FenetreRetro title={`Bonjour, ${user?.username || user?.email}`}>
          <div className="min-h-screen bg-[#1b1f3b] p-4">
      <h1 className="text-2xl font-bold text-[#faf3e0] mb-4">
        Tableau de bord
      </h1>
    {/* Ici le container React avec Profil / Souvenirs */}
    <DashboardContainer />
  </div>
    </FenetreRetro>
  );
}

export default Dashboard;
