import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  ChartBarIcon,
  EyeIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { participants, quizzes } from "../data/quiz-data";

export default function QuizDetails() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Add a class to the body for global styles
    document.body.classList.add(
      "bg-gradient-to-br",
      "from-indigo-900",
      "to-purple-900",
      "text-white"
    );

    // Find the quiz
    const foundQuiz = quizzes.find((q) => q.id === parseInt(id));
    setQuiz(foundQuiz);

    return () => {
      document.body.classList.remove(
        "bg-gradient-to-br",
        "from-indigo-900",
        "to-purple-900",
        "text-white"
      );
    };
  }, [id]);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <Link
          to={`/dashboard`}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition duration-300"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        >
          {quiz.title}
        </motion.h2>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl rounded-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <p className="text-sm text-gray-300">Total Questions</p>
                <p className="text-lg font-semibold text-white">
                  {quiz.questions}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-green-400 mr-3" />
              <div>
                <p className="text-sm text-gray-300">Total Participants</p>
                <p className="text-lg font-semibold text-white">
                  {quiz.participants}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-purple-400 mr-3" />
              <div>
                <p className="text-sm text-gray-300">Time Limit</p>
                <p className="text-lg font-semibold text-white">
                  {quiz.timeLimit} minutes
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Participants
        </motion.h3>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl rounded-lg overflow-hidden"
        >
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800 bg-opacity-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Time Taken
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {participants.map((participant, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={
                    index % 2 === 0
                      ? "bg-gray-800 bg-opacity-25"
                      : "bg-gray-900 bg-opacity-25"
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-300">
                        {participant.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 text-blue-400 mr-2" />
                      <div className="text-sm text-gray-300">
                        {participant.score} / {quiz.questions}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-purple-400 mr-2" />
                      <div className="text-sm text-gray-300">
                        {participant.timeTaken} minutes
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/report/${quiz.id}/${participant.username}`}
                      className="text-blue-400 hover:text-blue-300 flex items-center transition duration-300"
                    >
                      <EyeIcon className="h-5 w-5 mr-1" />
                      View Report
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  );
}
