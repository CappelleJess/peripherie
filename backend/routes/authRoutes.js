import express from 'express';
import { register, login, verifyToken } from '../controllers/authController.js';
import { getUserProfile } from '../controllers/userController.js';
import rateLimit from "express-rate-limit";

const router = express.Router(); // Créer un routeur Express

// Limite de tentative de login (ex: 5 essais par IP toutes les 15 min)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // max 5 tentatives
  message: {
    message: "Trop de tentatives. Réessaie dans 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', loginLimiter, login);

// Route protégée pour récupérer le profil utilisateur
router.get('/profile', verifyToken, getUserProfile);
    // OU --> // router.get('/profile', verifyToken, (req, res) => {
//     res.json({
//       message: 'Accès au profil utilisateur réussi',
//       userId: req.user.userId, // Information récupérée du JWT
//     });
//   });

export default router;