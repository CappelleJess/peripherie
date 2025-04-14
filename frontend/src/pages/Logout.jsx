import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null); // Effacer les informations de l'utilisateur
    localStorage.removeItem("token"); // Supprimer le token du localStorage
    navigate("/login"); // Rediriger vers la page de connexion
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
}

export default Logout;