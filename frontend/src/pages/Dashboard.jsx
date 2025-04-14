import React from "react";
import { useAuth } from "../contexts/AuthContext";
import PrivateRoute from "../components/PrivateRoute";

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {currentUser ? (
        <p>Bienvenue, {currentUser.email} !</p>
      ) : (
        <p>Veuillez vous connecter pour accéder à votre tableau de bord.</p>
      )}
    </div>
  );
}

export default Dashboard;