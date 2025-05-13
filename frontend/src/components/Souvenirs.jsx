import { motion } from 'framer-motion';

const ScoreBar = ({ label, value, color }) => {
  return (
    <div className="mb-4">
      <p className="mb-1">{label} : {value}/100</p>
      <div className="w-full h-3 bg-[#6b728e] rounded">
        <motion.div
          className="h-full rounded"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

const Souvenirs = ({ profile }) => {
  if(!profile) {
    return <p>Chargement des souvenirs...</p>
  }

  const { souvenirScore, ancragePasse, emergenceNostalgie } = profile;

    return (
      <div className="bg-[#1b1f3b] border border-[#6b728e] rounded-2xl p-4 shadow-lg text-sm text-[#faf3e0] w-full max-w-md">
      <p className="mb-4 text-[#d6c7ae] italic">🌸 Tu te souviens de la fleur séchée sur l'étagère... 🌸</p>

      <ScoreBar label="Souvenirs retrouvés" value={souvenirScore} color="#00ff9f" />
      <ScoreBar label="Ancrage au passé" value={ancragePasse} color="#d65a31" />
      <ScoreBar label="Nostalgie émergente" value={emergenceNostalgie} color="#e60073" />

      <p className="text-[#faf3e0] mt-4">Indice de mémoire : +15</p>
    </div>
  );
};
  
export default Souvenirs;