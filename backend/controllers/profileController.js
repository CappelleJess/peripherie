import Profile from '../models/Profile.js';

// Obtenir tous les profils (admin)
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'email');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir le profil de l'utilisateur connecté
export const getMyProfile = async (req, res) => {
  console.log("✅ Token décodé utilisateur :", req.user);
  try {
    const profile = await Profile.findOne({ user: req.user.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour le profil de l'utilisateur connecté
export const updateMyProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.userId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer son propre profil
export const deleteMyProfile = async (req, res) => {
  try {
    const result = await Profile.findOneAndDelete({ user: req.user.userId });
    if (!result) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    res.json({ message: 'Profil supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};