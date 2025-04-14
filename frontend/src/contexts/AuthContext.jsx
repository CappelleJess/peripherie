import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Créer un contexte pour l'authentification
const AuthContext = createContext();

// Créer un hook personnalisé pour accéder au contexte
export const useAuth = () => {
  return useContext(AuthContext);
};

// Créer le AuthProvider pour gérer l'état d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fonction pour se connecter
  const login = async (email, password) => {
    try {
      // Simule une requête d'authentification (à remplacer par une vraie API)
      const response = await axios.post("/api/login", { email, password });
      setUser(response.data);  // Stocke l'utilisateur dans l'état
      localStorage.setItem("user", JSON.stringify(response.data));  // Stocke l'utilisateur dans le localStorage
    } catch (err) {
      throw new Error("Identifiants incorrects.");
    }
  };

  // Fonction pour s'inscrire
  const register = async (email, password) => {
    try {
      // Simule une requête d'inscription (à remplacer par une vraie API)
      const response = await axios.post("/api/register", { email, password });
      setUser(response.data);  // Stocke l'utilisateur dans l'état
      localStorage.setItem("user", JSON.stringify(response.data));  // Stocke l'utilisateur dans le localStorage
    } catch (err) {
      throw new Error("Erreur lors de l'inscription.");
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setUser(null);  // Effacer l'utilisateur de l'état
    localStorage.removeItem("user");  // Supprimer l'utilisateur du localStorage
  };

  // Vérifier si un utilisateur est connecté
  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};