import { motion } from 'framer-motion';

const ScoreTotal = ({ score }) => {
  return (
    <div className="bg-[#1b1f3b] border border-[#6b728e] rounded-2xl p-4 shadow-lg text-sm text-[#faf3e0] w-full max-w-md">
      <h3 className="text-lg font-bold mb-3 text-[#00ff9f]">Score Global</h3>
      <p className="mb-2">Score total : <strong>{score}/100</strong></p>
      <div className="w-full h-4 bg-[#6b728e] rounded">
        <motion.div
          className="h-full bg-[#4a90e2] rounded"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2 }}
        />
      </div>
    </div>
  );
};

export default ScoreTotal;