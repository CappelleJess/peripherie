import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() { 
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Hook pour naviguer dynamiquement

  const handleLogout = () => {
    // Supprimer les données de l'utilisateur simulé
    logout();
    navigate("/");
};

  //   // Réinitialiser les états globaux
  //   setIsAuthenticated(false);
  //   setUser(null);

  //   // Rediriger vers la page d'accueil
  //   navigate("/");
  // };

  return (
    <header style={{ padding: "1rem", background: "#eee" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        {/* Lien toujours visible */}
        <NavLink
          to="/"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Accueil
        </NavLink>

        {!isAuthenticated ? (
          <>
            <NavLink to="/login">Connexion</NavLink>
            <NavLink to="/register">Inscription</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile">Profil</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/settings">Paramètres</NavLink>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;