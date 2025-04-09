import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Composant qui protège les routes privées en vérifiant l'authentification.
 * Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de login.
 * @param {boolean} isAuthenticated - État de l'authentification
 * @param {JSX.Element} children - Composants enfants à afficher si l'utilisateur est authentifié
 */
function PrivateRoute({ isAuthenticated, children }) {
  // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Sinon, on rend les enfants (la page protégée)
  return children;
}

export default PrivateRoute;