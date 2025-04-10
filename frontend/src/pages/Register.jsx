import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState({});
  
  // Gérer le changement de valeur des champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Valider le formulaire
  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.name) formErrors.name = "Le nom est requis";
    if (!formData.email) formErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email invalide";
    if (!formData.password) formErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 6) formErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    
    setErrors(formErrors);
    
    // Retourner `true` si pas d'erreurs
    return Object.keys(formErrors).length === 0;
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Formulaire soumis avec succès");
      // Envoyer les données à l'API (simulé ici)
      // Par exemple, avec axios : axios.post('/api/register', formData)
    } else {
      console.log("Des erreurs sont présentes dans le formulaire");
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