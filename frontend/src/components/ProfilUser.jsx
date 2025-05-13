import { useState } from "react";
import api from "../utils/api";

const ProfilUser = ({ profile, setProfile }) => {
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!profile) {
    return <div>Chargement du profil...</div>;
  }

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await api.put('/profile', { displayName });
      setProfile(res.data); // Mise à jour de l’état parent
      alert("Nom mis à jour !");
    } catch (error) {
      alert("Erreur lors de la mise à jour du profil.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#1b1f3b] border border-[#6b728e] rounded-2xl p-4 shadow-lg text-sm text-[#faf3e0] w-full max-w-md space-y-3">
      <h2 className="text-lg font-bold text-[#00ff9f]">Mon Profil</h2>

      <div className="flex items-center gap-2">
        <label className="font-bold">Nom :</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="px-2 py-1 rounded bg-[#2e2e2e] text-[#faf3e0] border border-[#00ff9f]"
        />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-2 py-1 bg-[#4a90e2] hover:bg-[#357ABD] text-white rounded"
        >
          {isSaving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>

      <div><span className="font-bold text-[#00ff9f]">Souvenir Score :</span> {profile.souvenirScore}</div>
      <div><span className="font-bold text-[#e60073]">Ancrage au passé :</span> {profile.ancragePasse}</div>
      <div><span className="font-bold text-[#d65a31]">Émergence nostalgique :</span> {profile.emergenceNostalgie}</div>
      <div><span className="font-bold text-[#faf3e0]">Score total :</span> {profile.score}</div>
      <div className="text-[#d6c7ae]">Dernière connexion : {new Date(profile.lastLoginDate).toLocaleDateString("fr-BE")}</div>
    </div>
  );
};

export default ProfilUser;