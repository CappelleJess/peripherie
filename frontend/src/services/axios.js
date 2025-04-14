import axios from "axios";

/**
 * Création d'une instance Axios personnalisée.
 * Ajouter ici un token d'authentification plus tard.
 * Voir doc officielle : https://axios-http.com/docs/instance
 */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;