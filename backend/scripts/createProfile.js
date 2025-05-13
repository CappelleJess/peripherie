import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profile from '../models/Profile.js'; // adapte le chemin selon ta structure

dotenv.config(); // charge les variables d'environnement

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connecté à MongoDB');

    const profile = new Profile({
      user: '680e9fef6736b7b280dad685', // remplace avec un _id d'utilisateur valide
      displayName: 'EchoPlayer',
      avatar: '',
      avatar: '',
      souvenirScore: 0,
      ancragePasse: 0,
      emergenceNostalgie: 0,
      score: 0,
      currentLevel: 1,
      lastLoginDate: new Date(),
      choices: []
    });

    await profile.save();
    console.log('Profil créé avec succès :', profile);

    await mongoose.disconnect();
    console.log('Déconnecté');
  } catch (err) {
    console.error('Erreur :', err.message);
  }
};

start();