import User from '../models/User.js';

export const isAdmin = async (req, res, next) => {
    try {
      const userId = req.user.userId; // récupéré via le token dans verifyToken
      const user = await User.findById(userId);
  
      if (!user || !user.roles.includes('admin')) {
        return res.status(403).json({ message: 'Accès interdit : Admins uniquement' });
      }
  
      next();
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la vérification du rôle' });
    }
};