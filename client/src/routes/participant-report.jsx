import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { mockReport } from "../data/quiz-data";

export default function ParticipantReport() {
  const { quizId, username } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    // In a real app, you'd fetch this data based on quizId and username
    setReport(mockReport);
  }, [quizId, username]);

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <Link
          to={`/quiz/details/${quizId}`}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition duration-300"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Quiz Details
        </Link>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Participant Report
        </motion.h2>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl rounded-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-300">Username</p>
              <p className="text-lg font-semibold text-white">
                {report.username}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Quiz</p>
              <p className="text-lg font-semibold text-white">
                {report.quizTitle}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Score</p>
              <p className="text-lg font-semibold text-white">
                {report.score} / {report.totalQuestions}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-300">Time Taken</p>
            <p className="text-lg font-semibold text-white">
              {report.timeTaken} minutes
            </p>
          </div>
        </motion.div>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Answers
        </motion.h3>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {report.answers.map((answer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl rounded-lg p-6"
            >
              <h4 className="text-lg font-semibold mb-2 text-white">
                Question {index + 1}: {answer.question}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-300">User's Answer</p>
                  <p
                    className={`text-md ${
                      answer.isCorrect ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {answer.userAnswer}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Correct Answer</p>
                  <p className="text-md text-green-400">
                    {answer.correctAnswer}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {answer.isCorrect ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-400 mr-2" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-400 mr-2" />
                )}
                <span
                  className={`font-semibold ${
                    answer.isCorrect ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {answer.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
