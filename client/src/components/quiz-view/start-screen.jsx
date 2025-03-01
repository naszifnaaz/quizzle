import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ClockIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function StartScreen({ quizData, isLoggedIn, handleStartQuiz }) {
  const isLoading = useSelector((store) => store.isLoading);
  const {
    title = "",
    desc = "",
    questions = [],
    timeLimit = 0,
    attempts = [],
    createdAt = new Date().toISOString(),
    creator = {},
  } = quizData || {};

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!quizData) return <div>Loading quiz data...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/70 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-lg border border-purple-500/20"
      >
        {/* Quiz Title */}
        <h1 className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          {title}
        </h1>

        {/* Quiz Description */}
        <p className="text-gray-300 text-center mb-6 text-lg">{desc}</p>

        {/* Creator Info */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-3 bg-indigo-900/30 px-4 py-2 rounded-lg">
            <UserCircleIcon className="h-8 w-8 text-indigo-200" />
            <div>
              <p className="text-sm font-medium text-indigo-100">
                {creator?.name}
              </p>
              <p className="text-xs text-purple-200">
                Created {formattedCreatedAt}
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-3 bg-indigo-900/20 rounded-lg">
            <QuestionMarkCircleIcon className="h-6 w-6 mb-1 text-indigo-300" />
            <span className="text-indigo-100">{questions.length}</span>
            <span className="text-xs text-indigo-300">Questions</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-purple-900/20 rounded-lg">
            <ClockIcon className="h-6 w-6 mb-1 text-purple-300" />
            <span className="text-purple-100">{timeLimit}</span>
            <span className="text-xs text-purple-300">Minutes</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-indigo-900/20 rounded-lg">
            <span className="text-2xl font-bold text-indigo-100">
              {attempts.length}
            </span>
            <span className="text-xs text-indigo-300">Attempts</span>
          </div>
        </div>

        {/* Start Quiz Button */}
        <form onSubmit={handleStartQuiz} className="space-y-4">
          <div>
            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 shadow-lg"
              >
                Start Quiz
              </motion.button>
            ) : (
              <div className="space-y-4">
                <Link to={"/login"}>
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 shadow-lg">
                    Sign In to Start
                  </button>
                </Link>
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
