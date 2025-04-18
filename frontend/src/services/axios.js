import axios from "axios";

/**
 * Création d'une instance Axios personnalisée.
 * Ajouter ici un token d'authentification plus tard.
 * doc officielle : https://axios-http.com/docs/instance
 */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajout automatique du token si présent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ou sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;