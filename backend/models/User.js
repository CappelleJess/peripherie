const mongoose = require('mongoose');

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // L'email doit être unique dans la base de données
  },
  password: {
    type: String,
    required: true,
  },
  // TODO: Ajouter d'autres champs comme un nom, une photo de profil, etc.
});

// Créer le modèle avec le schéma utilisateur
const User = mongoose.model('User', userSchema);

// Exporter le modèle pour l'utiliser dans les contrôleurs
module.exports = User;