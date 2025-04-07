// Importation des modules
const express = require('express'); // Importe Express
const dotenv = require('dotenv'); // Importe dotenv pour charger les variables d'env
const connectDB = require('./config/db'); // Importe fonction pour se connecter à MongoDB
const authRoutes = require('./routes/authRoutes.js') // Importe les routes d'authentification

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Connexion à la base de données MongoDB
connectDB();

// Création de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utiliser les routes d'authentification
app.use('api/auth', authRoutes);

// Route simple pour tester
app.get('/', (_req, res) => {
  res.send('Bienvenue sur le backend de Périphérie !');
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});