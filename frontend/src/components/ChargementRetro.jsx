import { motion } from 'framer-motion';

const ChargementRetro = ({ message = "Chargement du profil..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-[#00ff9f] font-mono animate-pulse text-sm">
      <motion.div
        className="mb-2 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
      >
        🧠
      </motion.div>
      <p>{message}</p>
      <div className="mt-2 w-32 h-1 bg-[#6b728e] rounded">
        <motion.div
          className="h-full bg-[#00ff9f] rounded"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ChargementRetro;
