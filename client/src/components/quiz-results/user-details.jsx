import { motion } from "framer-motion";
import ScoreCircle from "./score";

const UserDetails = ({ user }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl flex-grow flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-purple-300">
        User Details
      </h2>
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <p className="text-xl font-medium text-white">{user.name}</p>
          <p className="text-gray-300">Student</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <ScoreCircle score={user.score} total={user.totalQuestions} />
        <div className="text-center">
          <p className="text-3xl font-bold text-green-400">
            {user.correctAnswers}
          </p>
          <p className="text-sm text-gray-300">Correct</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-red-400">{user.wrongAnswers}</p>
          <p className="text-sm text-gray-300">Wrong</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDetails;
