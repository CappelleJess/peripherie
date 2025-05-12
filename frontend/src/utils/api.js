import axios from 'axios';

// Crée une instance Axios avec une URL de base
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Ajouter un intercepteur pour les requêtes sortantes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Ajouter un intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn("Non autorisé : redirection vers /login");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;