import React from "react";
import { NavLink } from "react-router-dom";

function Header({  isAuthenticated, setIsAuthenticated  }) {

  const handleLogout = () => {
    setIsAuthenticated(false); //Réinitialisation de l'état de connexion
  };

  return (
    <header style={{ padding: "1rem", background: "#eee" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Accueil
        </NavLink>

        {/* Afficher "Login" et "Register" si non connecté */}
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