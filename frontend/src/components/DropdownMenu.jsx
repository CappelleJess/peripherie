import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <button className="btn" onClick={toggleMenu}>Menu</button>
      {isOpen && (
        <ul className="dropdown-menu">
          {!user && (
            <>
              <li><Link to="/play">Jouer</Link></li>
              <li><Link to="/gameuniverse">Univers du jeu</Link></li>
              <li><Link to="/news">Actualités</Link></li>
              <li><Link to="/register">Inscription</Link></li>
              <li><Link to="/login">Connexion</Link></li>
            </>
          )}
          {user && (
            <>
              <li><Link to="/play">Jouer</Link></li>
              <li><Link to="/gameuniverse">Univers du jeu</Link></li>
              <li><Link to="/Actualités">Actualités</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><button onClick={logout}>Déconnexion</button></li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
