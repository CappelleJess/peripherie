import express, { json } from 'express'; 
import { config } from 'dotenv'; 
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

// Chargement des variables d'environnement depuis le fichier .env
config();

// Connexion à la base de données MongoDB
connectDB();

// Création de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(json());

// Utiliser les routes d'authentification
app.use('/api/auth', (req, res, next) => {
  console.log('Routing request to /api/auth');
  next();
}, authRoutes);

// Utiliser les routes de profils
app.use('/api/profile', (req, res, next) => {
  console.log('Routing request to /api/profile');
  next();
}, profileRoutes);

// Route simple pour tester
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de Périphérie !');
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});