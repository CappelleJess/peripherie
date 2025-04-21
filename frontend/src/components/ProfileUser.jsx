import React from "react";

const ProfilUser = ({ profile }) => {
  if (!profile) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="p-3 space-y-2 text-sm">
      <div>
        <span className="font-bold text-[#00ff9f]">Nom :</span> {profile.displayName}
      </div>
      <div>
        <span className="font-bold text-[#4a90e2]">SouvenirScore :</span> {profile.souvenirScore}
      </div>
      <div>
        <span className="font-bold text-[#e60073]">Lien avec PNJ :</span> {profile.lienPNJ}
      </div>
      <div>
        <span className="font-bold text-[#d65a31]">Ancrage au passé :</span> {profile.ancragePasse}
      </div>
      <div>
        <span className="font-bold text-[#faf3e0]">Score total :</span> {profile.score}
      </div>
      <div className="text-[#d6c7ae]">
        Dernière connexion : {new Date(profile.lastLoginDate).toLocaleDateString("fr-BE")}
      </div>
    </div>
  );
};

export default ProfilUser;
