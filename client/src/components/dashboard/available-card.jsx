import {
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AvailableQuizCard({ quiz }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-3">{quiz.title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {quiz.description}
        </p>
        <div className="flex flex-col space-y-2 text-sm text-gray-300">
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 mr-2 text-green-400" />
            <span>{quiz.participants} Participants</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-purple-400" />
            <span>{quiz.timeLimit} Minutes</span>
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
        <div className="flex justify-end">
          <Link to={`/quiz/${quiz.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300"
            >
              Take Quiz
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
