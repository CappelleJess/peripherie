import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Utilisateur test
    if(username === "user" && password === "password") {
      setIsAuthenticated(true); // Connexion réussie
      navigate("/dashboard"); // Redirection vers le Dashboard
    } else {
      alert("Identifiants incorrects !");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nom d'utilisateur: </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label>Mot de passe: </label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;