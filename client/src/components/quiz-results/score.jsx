import { motion } from "framer-motion";

const ScoreCircle = ({ score, total }) => {
  const percentage = (score / total) * 100;
  const circumference = 2 * Math.PI * 40;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-600 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <motion.circle
          className="text-blue-400 progress-ring__circle stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          initial={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset:
              circumference - (percentage / 100) * circumference,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.circle>
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.span
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xl text-gray-300">/ {total}</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
