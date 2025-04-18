import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { login } = useAuth();

  // Met à jour les champs du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation des champs du formulaire
  const validateForm = () => {
    const formErrors = {};

    if (!formData.name) formErrors.name = "Le nom est requis";
    if (!formData.email) formErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email invalide";
    if (!formData.password) formErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 6)
      formErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Soumission du formulaire d'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Appel au backend (Express) pour enregistrer un nouvel utilisateur
      const response = await axios.post("http://localhost:5000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Stockage du token et email via le contexte d'authentification
      login(response.data);
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrors({ email: "Cet email est déjà utilisé." });
      } else {
        console.error(err);
        alert("Une erreur est survenue lors de l'inscription.");
      }
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div>
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;