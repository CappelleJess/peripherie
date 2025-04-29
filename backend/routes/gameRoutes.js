import { Router } from 'express';
const router = Router();
import { getProfile, updateProfile, getGameProgress, savePlayerChoice, updateGameScores } from '../controllers/gameController.js';

// Récupérer le profil d'un utilisateur
router.get('/profile/:userId', getProfile);

// Mettre à jour le profil d'un utilisateur
router.put('/profile/:userId', updateProfile);

// Récupérer la progression du jeu (niveau, score, etc.)
router.get('/game/progress/:userId', getGameProgress);

// Enregistrer un choix du joueur
router.post('/game/choices/:userId', savePlayerChoice);

// Mettre à jour les scores du joueur
router.put('/game/scores/:userId', updateGameScores);

export default router;
