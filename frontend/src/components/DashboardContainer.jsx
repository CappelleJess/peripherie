import React, { useState, useEffect } from 'react';
import FenetreRetro from './FenetreRetro';
import ProfilUser from './ProfilUser';
import Souvenirs from './Souvenirs';

const DashboardContainer = () => {
  // État pour gérer les fenêtres ouvertes
  const [fenetres, setFenetres] = useState([]);

  // État pour gérer le profil et son setter
  const [profil, setProfil] = useState(null);

  // Charger les données du profil utilisateur
  useEffect(() => {
    const token = localStorage.getItem('token'); // si besoin d'auth
    fetch('/api/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Non authentifié');
        return res.json();
      })
      .then(setProfil)      
      .catch((err) => console.error("Erreur de chargement du profil :", err));
  }, []);

  // Fonction pour ouvrir une fenêtre (si elle n'est pas déjà ouverte)
  const ouvrirFenetre = (type) => {
    if (!fenetres.find(f => f.type === type)) {
      const nouvelleFenetre = {
        id: Date.now(),
        type,
        titre: type === 'profil' ? 'Mon Profil' : 'Souvenirs'
      };
      setFenetres([...fenetres, nouvelleFenetre]);
    }
  };

  // Fermer une fenêtre
  const fermerFenetre = (id) => {
    setFenetres(fenetres.filter(f => f.id !== id));
  };

  // Exemple fictif de profil
  // const profil = {
  //   displayName: "EchoPlayer",
  //   souvenirScore: 42,
  //   lienPNJ: "fort",
  //   ancragePasse: "modéré",
  //   score: 88,
  //   lastLoginDate: "2025-04-19T13:15:00Z"
  // };

  // Rendu du contenu selon le type
    const getContenu = (type) => {
        switch (type) {
            case "profil":
        return <ProfilUser profile={profil} />;
            case "souvenirs":
        return <Souvenirs />;
            default:
        return <div>Contenu inconnu</div>;
        }
    };

  return (
    <div className="relative w-full h-full bg-[#1b1f3b] text-[#faf3e0]">
      {/* Barre de boutons */}
      <div className="p-2 flex gap-4 bg-[#2e2e2e] text-white shadow-md">
        <button
          className="bg-[#4a90e2] hover:bg-[#357ABD] px-3 py-1 rounded"
          onClick={() => ouvrirFenetre('profil')}
        >
          Ouvrir Profil
        </button>
        <button
          className="bg-[#9b5de5] hover:bg-[#844bcc] px-3 py-1 rounded"
          onClick={() => ouvrirFenetre('souvenirs')}
        >
          Ouvrir Souvenirs
        </button>
      </div>

      {/* Fenêtres ouvertes */}
      {fenetres.map((f) => (
        <FenetreRetro
          key={f.id}
          titre={f.titre}
          onClose={() => fermerFenetre(f.id)}
        >
          {getContenu(f.type)}
        </FenetreRetro>
      ))}
    </div>
  );
};

export default DashboardContainer;
