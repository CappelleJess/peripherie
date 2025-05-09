import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token invalide' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    console.error("Erreur de vérification du token:", err.message);
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};