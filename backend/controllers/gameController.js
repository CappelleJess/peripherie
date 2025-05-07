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
            currentLevel: profile.currentLevel,
        });
    } catch (err) {
        console.error("Erreur dans getGameProgress:", err);
        res.status(500).json({ message: err.message });
    }
}

// Enregistrer un choix du joueur
export async function savePlayerChoice(req, res) {
    const { choice, impactOnStory } = req.body;
    let souvenirScoreChange = 0;
    let ancragePasseChange = 0;
    let emergenceNostalgieChange = 0;

    try {
        // Logique pour ajuster les variables en fontion des choix
        if (choice === 'examinerObjet') {
            souvenirScoreChange = 10;  // 
            ancragePasseChange = -5;   // 
            emergenceNostalgieChange = 5;  // 
        }

        // Mise à jour du profil avec les nouveaux changements
        const profile = await Profile.findOneAndUpdate(
            { user: req.params.userId },
            {
                $inc: {  // On utilise $inc pour incrémenter les variables
                    souvenirScore: souvenirScoreChange,
                    ancragePasse: ancragePasseChange,
                    emergenceNostalgie: emergenceNostalgieChange
                },
                $push: { choices: { choice, impactOnStory } } // Ajouter le choix à l'historique
            },
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
        const { souvenirScore, ancragePasse, emergenceNostalgie } = req.body;

        const profile = await Profile.findOneAndUpdate(
            { user: req.params.userId },
            {
                souvenirScore,  // Mise à jour du souvenirScore
                ancragePasse,   // Mise à jour du ancragePasse
                emergenceNostalgie  // Mise à jour de l'émergenceNostalgie
            },
            { new: true }
        );
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.json(profile);
    } catch (err) {
        console.error("Erreur dans updateGameScores:", err);
        res.status(500).json({ message: err.message });
    }
}