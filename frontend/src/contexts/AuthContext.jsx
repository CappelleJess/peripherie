import React, { createContext, useState, useContext, useEffect } from "react";
import { /*login as loginService, register as registerService,*/ logout as logoutService } from "../services/authService";

// Créer un contexte pour l'authentification
const AuthContext = createContext();

// Créer un hook personnalisé pour accéder au contexte
export const useAuth = () => useContext(AuthContext);

// Créer le AuthProvider pour gérer l'état d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // utilisateur actuel
  const [loading, setLoading] = useState(true); //chargement initial

    // Chargement initial depuis localStorage
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, []);

  // Fonction pour se connecter/connexion via API
  const login = async (email, password) => {
    console.log("AuthContext + login()", email, password);
    try {
      //const token = await loginService({ email, password });
      // Décodage du token si besoin pour stocker infos utilisateur
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Erreur dans AuthContext  login()", err.response?.data || err.message);
      throw new Error("Échec de la connexion.");
    }
  };

  // Fonction pour s'inscrire - via API
  const register = async (email, password, username) => {
    try {
      //const token = await registerService({ username, email, password});
      const userData = { email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      throw new Error("Échec de l'inscription.");
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    logoutService();
    setUser(null);  // Effacer l'utilisateur de l'état
    localStorage.removeItem("user");  // Supprimer l'utilisateur du localStorage
  };

  // Vérifier si un utilisateur est connecté
  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
  <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
  );
};