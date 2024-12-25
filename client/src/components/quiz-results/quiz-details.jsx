import { motion } from "framer-motion";

const QuizDetails = ({ details }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl flex-grow flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-purple-300">
        Quiz Details
      </h2>
      <div className="space-y-2 text-gray-300">
        <p>
          <span className="font-medium text-white">Title:</span> {details.title}
        </p>
        <p>
          <span className="font-medium text-white">Duration:</span>{" "}
          {details.duration}
        </p>
        <p>
          <span className="font-medium text-white">Difficulty:</span>{" "}
          {details.difficulty}
        </p>
      </div>
    </motion.div>
  );
};

export default QuizDetails;
