import jwt from 'jsonwebtoken';

// Middleware pour vérifier le token JWT
export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log("AuthHeader reçu :", authHeader);
  
  // Le token est attendu sous la forme : "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token manquant' });
  }

  try {
    // Vérifie et décode le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé :", decoded);
    req.userId = decoded.userId; // On ajoute l'ID de l'utilisateur à la requête
    next();
  } catch (err) {
    console.error("Erreur de vérification du token :", err.message);
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
}