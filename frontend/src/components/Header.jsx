import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header({ isAuthenticated, setIsAuthenticated, setUser }) {
  const navigate = useNavigate(); // ✅ Hook pour naviguer dynamiquement

  const handleLogout = () => {
    // Supprimer les données de l'utilisateur simulé
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Réinitialiser les états globaux
    setIsAuthenticated(false);
    setUser(null);

    // Rediriger vers la page d'accueil
    navigate("/");
  };

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

        {/* Lien conditionnel : dépend de l'état de connexion */}
        {!isAuthenticated ? (
          <>
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              Connexion
            </NavLink>
            <NavLink
              to="/register"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              Inscription
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/profile"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              Profil
            </NavLink>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              Dashboard
            </NavLink>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;