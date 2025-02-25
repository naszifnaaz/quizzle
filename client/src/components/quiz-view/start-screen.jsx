import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClockIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function StartScreen({ quizData, isLoggedIn, handleStartQuiz }) {
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
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          {quizData.title}
        </h1>
        <div className="flex justify-between mb-6">
          <div className="flex items-center text-gray-300">
            <QuestionMarkCircleIcon className="h-5 w-5 mr-2 text-blue-400" />
            <span>{quizData.questions.length} Questions</span>
          </div>
          <div className="flex items-center text-gray-300">
            <ClockIcon className="h-5 w-5 mr-2 text-purple-400" />
            <span>{quizData.timeLimit} Minutes</span>
          </div>
        </div>
        <form onSubmit={handleStartQuiz} className="space-y-4">
          <div>
            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Start Quiz
              </motion.button>
            ) : (
              <div className="space-y-4">
                <Link to={"/login"}>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Sign In
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
