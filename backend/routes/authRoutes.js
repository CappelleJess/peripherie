import express from 'express';
import { register, login, verifyToken } from '../controllers/authController.js';

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

export default router;