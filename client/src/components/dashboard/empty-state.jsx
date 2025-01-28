import { motion } from "framer-motion";

const EmptyState = ({ message, imageSrc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center p-8"
    >
      <img
        src={imageSrc || "/placeholder.svg"}
        alt="No quizzes"
        className="mx-auto mb-6 w-56 h-56 object-contain"
      />
      <h3 className="text-2xl font-semibold mb-4">{message}</h3>
      <p className="text-lg text-gray-300">
        Start creating or attempting quizzes to see them here!
      </p>
    </motion.div>
  );
};

export default EmptyState;
