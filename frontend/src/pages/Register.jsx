import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

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

    if (!formData.username) formErrors.username = "Le nom d'utilisateur est requis";
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
      await register(formData.username, formData.email, formData.password);
      setSuccessMessage("Compte crée avec succès ! Redirection en cours...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // délai de 2s
    } catch (err) {
      if (err.message.includes("Email déjà utilisé")) {
        setErrors({ email: "Cet email est déjà utilisé" });
      } else {
        console.error("Erreur d'inscription :", err);
        alert("Une erreur est survenue lors de l'inscription.");
      }
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange}/>
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}/>
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange}/>
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div>
          <label>Confirmer le mot de passe</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;