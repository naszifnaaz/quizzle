import {
  DocumentTextIcon,
  ClockIcon,
  ChartBarIcon,
  TrophyIcon,
  ArrowPathIcon,
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ParticipatedQuizCard({ quiz }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-3">
          {quiz.quiz.title}
        </h3>
        <div className="flex flex-col space-y-2 text-sm text-gray-300">
          <div className="flex items-center">
            <ChartBarIcon className="h-5 w-5 mr-2 text-orange-400" />
            <span>Score: {quiz.score}%</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-purple-400" />
            <span>Time Taken: {quiz.timeTaken} minutes</span>
          </div>
          <div className="flex items-center">
            <TrophyIcon className="h-5 w-5 mr-2 text-yellow-400" />
            <span>Rank: #{quiz.rank} in Leaderboard</span>
          </div>
          <div className="flex items-center">
            <UserCircleIcon className="h-5 w-5 mr-2 text-blue-400" />
            <div className="flex items-center gap-2">
              <img
                src={quiz.creator.avatar || "/default-avatar.png"}
                alt={quiz.creator.name}
                className="w-6 h-6 rounded-full"
              />
              <span>Created by {quiz.creator.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-5 px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to={`/quiz/${quiz.quiz.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold"
            >
              <ArrowPathIcon className="h-5 w-5" />
              Retry
            </motion.button>
          </Link>
          <Link to={`/report/${quiz.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold"
            >
              <ClipboardDocumentCheckIcon className="h-5 w-5" />
              See Report
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
