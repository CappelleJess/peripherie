import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>Bienvenue, {user.username} !</p>
      ) : (
        <p>Veuillez vous connecter pour accéder à votre tableau de bord.</p>
      )}
    </div>
  );
}

export default Dashboard;