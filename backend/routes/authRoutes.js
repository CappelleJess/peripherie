const express = require('express'); // Importer Express
const { register, login } = require('../controllers/authController'); // Importer les contrôleurs d'authentification

const router = express.Router(); // Créer un routeur Express

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

module.exports = router; // Exporter le routeur