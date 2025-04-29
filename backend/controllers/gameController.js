import Profile from '../models/Profile.js';

// Récupérer le profil d'un utilisateur
export async function getProfile(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.params.userId });
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.json(profile);
    } catch (err) {
        console.error("Erreur dans getProfile:", err);
        res.status(500).json({ message: err.message });
    }
}

// Mettre à jour le profil d'un utilisateur
export async function updateProfile(req, res) {
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.params.userId },
            req.body,
            { new: true }
        );
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.json(profile);
    } catch (err) {
        console.error("Erreur dans updateProfile:", err);
        res.status(500).json({ message: err.message });
    }
}

// Récupérer la progression du jeu (niveau, score, etc.)
export async function getGameProgress(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.params.userId });
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.json({
            souvenirScore: profile.souvenirScore,
            currentLevel: profile.currentLevel, // Assurez-vous que ce champ existe dans votre modèle
        });
    } catch (err) {
        console.error("Erreur dans getGameProgress:", err);
        res.status(500).json({ message: err.message });
    }
}

// Enregistrer un choix du joueur
export async function savePlayerChoice(req, res) {
    const { choice, impactOnStory } = req.body;
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.params.userId },
            { $push: { choices: { choice, impactOnStory } } }, // Ajoute le choix à un tableau 'choices'
            { new: true }
        );
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.json(profile);
    } catch (err) {
        console.error("Erreur dans savePlayerChoice:", err);
        res.status(500).json({ message: err.message });
    }
}

// Mettre à jour les scores du joueur (souvenirScore, par exemple)
export async function updateGameScores(req, res) {
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.params.userId },
            { souvenirScore: req.body.souvenirScore }, // Met à jour le score
            { new: true }
        );
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.json(profile);
    } catch (err) {
        console.error("Erreur dans updateGameScores:", err);
        res.status(500).json({ message: err.message });
    }
}
