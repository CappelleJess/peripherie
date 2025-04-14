const express = require('express');
const { register, login } = require('../controllers/authController');
const { verifyToken } = require('../controllers/authController');

const router = express.Router(); // Créer un routeur Express

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route protégée pour tester l'authentification
router.get('/profile', verifyToken, (req, res) => {
    res.json({
      message: 'Accès au profil utilisateur réussi',
      userId: req.user.userId, // Information récupérée du JWT
    });
  });

module.exports = router;