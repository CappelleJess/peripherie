// controllers/userController.js

import User from '../models/User.js';
import Profile from '../models/Profile.js';

/**
 * Récupérer le profil de l'utilisateur connecté
 * Route : GET /api/user/profile
 * Accès : Privé (nécessite JWT)
 */
export const getUserProfile = async (req, res) => {
  try {
    // L'identifiant utilisateur est extrait du token par verifyToken
    const userId = req.user.userId;

    // Rechercher le profil correspondant à l'utilisateur
    const profile = await Profile.findOne({ user: userId }).populate('user', 'email');

    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du profil' });
  }
};
