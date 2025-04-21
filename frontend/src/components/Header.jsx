import React/*, { useState }*/ from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() { 
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Hook pour naviguer dynamiquement
  // const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
};

  return (
    <header className="custom-header">
      <div className="header-content">
        <NavLink to="/">
          <div className="logo">
            <img src="/img/logo_glitch_mini.gif" alt="Logo Périphérie" className="logo-img" />
          </div>
        </NavLink>

        <nav className="nav-links">
          {!isAuthenticated ? ( 
            <>
              <NavLink to="/">Accueil</NavLink>
              <NavLink to="/play">Jouer</NavLink>
              <NavLink to="/gameuniverse">Univers du jeu</NavLink>
              <NavLink to="/news">Actualites</NavLink>
              <NavLink to="/login">Connexion</NavLink>
              <NavLink to="/register">Inscription</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/">Accueil</NavLink>
              <NavLink to="/play">Jouer</NavLink>
              <NavLink to="/gameuniverse">Univers du jeu</NavLink>
              <NavLink to="/news">Actualites</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button onClick={handleLogout}>Déconnexion</button>
            </>
          )}
        </nav>

        {/* <button
          className="menu-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          ≡
        </button> */}
      </div>

      {/* {showMenu && (
        <div className="dropdown-menu">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Connexion</NavLink>
              <NavLink to="/register">Inscription</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/settings">Paramètres</NavLink>
              <button onClick={handleLogout}>Déconnexion</button>
            </>
          )}
        </div>
      )} */}
    </header>
  );
}

export default Header;