import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Composant pour protéger une route. 
 * Si l'utilisateur est connecté, affiche le composant donné.
 * Sinon, redirige vers /login.
 */
function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

export default PrivateRoute;