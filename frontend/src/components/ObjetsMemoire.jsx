const icones = {
  fleur: "🌸",
  cadre: "🖼️",
  ordinateur: "🖥️",
  livre: "📖",
  photo: "🖼️",
  lettre: "📜",
};

const ObjetsMemoire = ({ objets }) => {
  if (!objets || objets.length === 0) {
    return (
      <div className="text-[#d6c7ae] mt-4 italic">
        Aucun souvenir débloqué pour le moment.
      </div>
    );
  }

  return (
    <div className="bg-[#1b1f3b] border border-[#6b728e] rounded-2xl p-4 shadow-lg text-sm text-[#faf3e0] w-full max-w-md mt-4">
      <h3 className="text-lg font-bold text-[#9b5de5] mb-2">Objets mémoriels retrouvés</h3>
      <ul className="flex flex-wrap gap-2">
        {objets.map((obj, index) => (
          <li key={index} className="px-2 py-1 bg-[#2e2e2e] rounded text-xl flex items-center">
            <span>{icones[obj] || "❓"}</span>
            <span className="ml-2 text-sm">{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObjetsMemoire;
