// Importation des modules
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Connexion à la base de données MongoDB
connectDB();

// Création de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route simple pour tester
app.get('/', (_req, res) => {
  res.send('Bienvenue sur le backend de Périphérie !');
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});