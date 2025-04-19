import api from "./axios";

// Inscription
export const register = async ({ username, email, password }) => {
    const res = await api.post("/auth/register", { username, email, password });
    const { token } = res.data;
    localStorage.setItem("token", token);
    return token;
};

// Connexion via backend
export const login = async ({ email, password }) => {
        console.log("authService → envoi à l'API login");
    try {
        const res = await api.post("/auth/login", { email, password });
        console.log("authService → réponse reçue", res.data);
        
        const { token, username, email: returnedEmail } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ username, email: returnedEmail }));

    return token;    
    } catch (error) {
        console.error("authService -> ERREUR", error.respond?.data || error.message);
        throw error;
    }
};

// Déconnexion
export const logout = () => {
    localStorage.removeItem("token");
};

// Utilitaire
export const getToken = () => {
    return localStorage.getItem("token");
};