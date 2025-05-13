import { useState, useEffect } from 'react';
import FenetreRetro from './FenetreRetro';
import ProfilUser from './ProfilUser';
import Souvenirs from './Souvenirs';
import api from '../utils/api';
import ScoreTotal from './ScoreTotal.jsx';
import ObjetsMemoire from './ObjetsMemoire.jsx';
import ChargementRetro from './ChargementRetro.jsx';

const DashboardContainer = () => {
  // État pour gérer les fenêtres ouvertes
  const [fenetres, setFenetres] = useState([]);

  // État pour gérer le profil et son setter
  const [profil, setProfil] = useState(null);

  // Charger les données du profil utilisateur
  useEffect(() => {
    api.get('/profile')
      .then(res => {
        console.log("Profil chargé :", res.data);
        setProfil(res.data);
      })
      .catch((err) => {
        console.error("Erreur de chargement du profil :", err.message);
      });
  }, []);
  
  const toggleFenetre = (type, titre) => {
    const existante = fenetres.find(f => f.type === type);
    if (existante) {
      // Si elle est déjà ouverte, on la ferme
      setFenetres(fenetres.filter(f => f.type !== type));
    } else {
      // Sinon on l'ajoute
      setFenetres([...fenetres, { id: Date.now(), type, titre }]);
    }
  };

  const fermerFenetre = (id) => {
    setFenetres(fenetres.filter(f => f.id !== id));
  };

  // Rendu du contenu selon le type
    const getContenu = (type) => {
      // Garde-fou global - protection de l'accès 
      if (!profil) return <ChargementRetro message="Chargement des souvenirs..." />;
      switch (type) {
        case "profil":
          return <ProfilUser profile={profil} setProfil={setProfil} />;
        case "souvenirs":
          return <Souvenirs profile={profil} />;
        case "progression":
          return (
            <>
              <div className="mt-4">
                <ScoreTotal score={profil.score} />
                <ObjetsMemoire objets={profil.objetsDebloques} />
              </div>
            </>
          );
        default:
          return <div>Contenu inconnu</div>;
      }
    };

  return (
  <div className="relative w-full h-auto min-h-screen bg-[#1b1f3b] text-[#faf3e0] p-4 ">
      {/* Barre de boutons */}
      <div className="p-2 flex gap-4 bg-[#3e4161] text-white shadow-md border-b border-[#6b728e]">
        <button
          className="bg-[#4a90e2] hover:bg-[#357ABD] px-3 py-1 rounded"
          onClick={() => toggleFenetre('profil', 'Mon Profil')}
        >
          Profil
        </button>
        <button
          className="bg-[#9b5de5] hover:bg-[#844bcc] px-3 py-1 rounded"
          onClick={() => toggleFenetre('souvenirs', 'Souvenirs')}
        >
          Souvenirs
        </button>
        <button
          className="bg-[#d65a31] hover:bg-[#b04a25] px-3 py-1 rounded"
          onClick={() => toggleFenetre('progression', 'Progression')}
        >
          Progression
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