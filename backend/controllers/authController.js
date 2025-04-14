const bcrypt = require('bcryptjs'); // Importer bcrypt pour le hachage du mot de passe
const jwt = require('jsonwebtoken'); // Importer jsonwebtoken pour la création du JWT
const User = require('../models/user'); // Importer le modèle utilisateur

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajouter les informations de l'utilisateur au request
    next(); // Passer à la route suivante
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

// Fonction d'inscription des utilisateurs
const register = async (req, res) => {
  const { email, password } = req.body; // Récupérer les données du corps de la requête

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email déjà utilisé' }); // Si l'email est déjà pris, renvoyer une erreur
    }

    // Hacher le mot de passe avec bcrypt
    const salt = await bcrypt.genSalt(10); // Créer un "sel" pour le hachage (plus le nombre est élevé, plus c'est sécurisé)
    const hashedPassword = await bcrypt.hash(password, salt); // Hacher le mot de passe

    // Créer un nouvel utilisateur
    const newUser = new User({ email, password: hashedPassword });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // Créer un token JWT pour l'utilisateur, avec une expiration de 1 heure
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Expiration du token
    });

    // Renvoyer une réponse avec le message et le token
    res.status(201).json({ message: 'Utilisateur créé', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' }); // Erreur interne du serveur
  }
};

// Fonction de connexion des utilisateurs
const login = async (req, res) => {
  const { email, password } = req.body; // Récupérer les informations d'identification

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' }); // Si l'utilisateur n'est pas trouvé, renvoyer une erreur
    }

    // Comparer le mot de passe envoyé avec celui haché dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' }); // Si les mots de passe ne correspondent pas, renvoyer une erreur
    }

    // Générer un JWT avec un identifiant d'utilisateur unique
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Expiration du token
    });

    // Renvoyer la réponse avec le token d'authentification
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Exporter les fonctions pour pouvoir les utiliser dans les routes
module.exports = { register, login, verifyToken };