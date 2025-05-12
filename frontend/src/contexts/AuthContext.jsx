import { createContext, useState, useContext, useEffect } from "react";
import { login as loginService, register as registerService, logout as logoutService } from "../services/authService";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

// Créer un contexte pour l'authentification
const AuthContext = createContext();

// Créer un hook personnalisé pour accéder au contexte
export const useAuth = () => useContext(AuthContext);

// Créer le AuthProvider pour gérer l'état d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // utilisateur actuel
  const [loading, setLoading] = useState(true); //chargement initial
  const navigate = useNavigate();

    // Chargement initial depuis localStorage
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        try {
          const decoded = jwtDecode(token); // utilise jwtDecode
          const now = Date.now() / 1000;

          if (decoded.exp && decoded.exp < now) {
            console.warn("Token expiré");
            toast.info("Votre session a expiré. Veuillez vous reconnecter.", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'retro-toast',
            bodyClassName: 'retro-toast-body',
            progressClassName: 'retro-toast-progress',
          });
            navigate("/login");
            logout(); // déconnexion auto
          } else {
            setUser(JSON.parse(storedUser)); // token valide
          }
        } catch (e) {
          console.error("Échec du décodage du token :", e);
          logout();
        }
      }
      setLoading(false);
    }, [navigate]);

  // Fonction pour se connecter/connexion via API
  const login = async (email, password) => {
    console.log("AuthContext + login()", email, password);
    try {
      const { token, user } = await loginService({ email, password });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    } catch (err) {
      console.error("AuthContext -> erreur login: ", err.response?.data || err.message);
      throw err;
    }
  };

  // Fonction pour s'inscrire - via API
  const register = async ({ username, email, password }) => {
    try {
      const { token, user } = await registerService({ username, email, password });
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.error("Erreur backend register():", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Échec de l'inscription.");
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    logoutService();
    setUser(null);  // Effacer l'utilisateur de l'état
    localStorage.removeItem("user");  // Supprimer l'utilisateur du localStorage
  };

  // // Vérifier si un utilisateur est connecté
  // const value = { user, login, register, logout, isAuthenticated: !!user };

  return (
  <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
    {!loading && children}
  </AuthContext.Provider>
  );
};