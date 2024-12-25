import {
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function QuizCard({ quiz, isParticipated = false }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-3">{quiz.title}</h3>
        <div className="flex flex-col space-y-2 text-sm text-gray-300">
          <div className="flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-400" />
            <span>{quiz.questions.length} Questions</span>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 mr-2 text-green-400" />
            <span>{quiz.attempts.length} Participants</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-purple-400" />
            <span>{quiz.timeLimit} Minutes</span>
          </div>
          {isParticipated && (
            <>
              <div className="flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-orange-400" />
                <span>Score: {quiz.score}%</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-indigo-400" />
                <span>Time Taken: {quiz.timeTaken} minutes</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="bg-white bg-opacity-5 px-6 py-4">
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              quiz.status === "Published"
                ? "bg-green-400 bg-opacity-20 text-green-200"
                : quiz.status === "Completed"
                ? "bg-blue-400 bg-opacity-20 text-blue-200"
                : "bg-yellow-400 bg-opacity-20 text-yellow-200"
            }`}
          >
            {quiz.status}
          </span>
          <Link to={`/quiz/${quiz._id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-400 hover:text-blue-300 font-semibold transition duration-300 ease-in-out"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
