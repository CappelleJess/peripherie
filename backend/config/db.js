const mongoose = require('mongoose');

// Fonction asynchrone de connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // Obsolète: {useNewUrlParser: true, useUnifiedTopology: true}
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Échec de connexion à MongoDB:', error.message);
    process.exit(1); // Arrête l'application en cas d'erreur
  }
};

module.exports = connectDB;