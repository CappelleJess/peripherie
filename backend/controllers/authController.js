import { genSalt, hash, compare } from 'bcryptjs';
import pkg from 'jsonwebtoken';
const { verify, sign } = pkg;
import User from '../models/User.js';
import Profile from '../models/Profile.js';

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Non authentifié' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    console.log('Token décodé :', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erreur de décodage JWT:', err.message);
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};

// Fonction d'inscription des utilisateurs
const register = async (req, res) => {
  const { username, email, password } = req.body; // Récupérer les données du corps de la requête
  console.log("Requête d'inscription reçue :", req.body);
  console.log("Données reçues pour inscription:", { username, email, password });

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("Email déjà pris :", email);
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hacher le mot de passe avec bcrypt
    const salt = await genSalt(10); // Créer un "sel" pour le hachage
    const hashedPassword = await hash(password, salt); // Hacher le mot de passe

    // Créer un nouvel utilisateur
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save(); // Sauvegarder l'utilisateur dans la base de données

    // Créer automatiquement un profil vide lié à l'utilisateur
    const newProfile = new Profile({
      user: newUser._id,
      displayName: username, // ou email.split('@')[0]
      avatar: '',
      souvenirScore: 0,
      ancragePasse: 0,
      emergenceNostalgie: 0,
      score: 0,
      currentLevel: 1,
      lastLoginDate: new Date(),
      choices: []
    });
    await newProfile.save();
    console.log("Profil lié sauvegardé :", newProfile);

    // Créer un token JWT pour l'utilisateur
    const token = sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Renvoyer le token et l'objet user (attendu par le frontend)
    res.status(201).json({
      token, user: {
        username: newUser.username,
        email: newUser.email,
        _id: newUser._id, },
    });
  } catch (error) {
    console.error("Erreur dans register() :", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Fonction de connexion des utilisateurs
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export { register, login, verifyToken };