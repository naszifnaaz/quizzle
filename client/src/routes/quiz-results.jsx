import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LightBulbIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { FaTrophy, FaUser, FaClock, FaChartBar } from "react-icons/fa";

// Merged UserQuizDetails Component
const UserQuizDetails = ({ user, quizDetails }) => (
  <motion.div
    className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 shadow-xl text-white"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
      <motion.div
        className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <FaUser className="text-5xl text-purple-600" />
      </motion.div>
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
        <p className="text-xl mb-2">{quizDetails.title}</p>
        <div className="flex justify-center md:justify-start space-x-4">
          <span className="flex items-center">
            <FaClock className="mr-2" /> {quizDetails.duration}
          </span>
          <span className="flex items-center">
            <FaChartBar className="mr-2" /> {quizDetails.difficulty}
          </span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 text-center">
      <motion.div
        className="bg-white bg-opacity-20 rounded-lg p-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <p className="text-3xl font-bold">
          {user.score}/{user.totalQuestions}
        </p>
        <p className="text-sm">Score</p>
      </motion.div>
      <motion.div
        className="bg-white bg-opacity-20 rounded-lg p-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <p className="text-3xl font-bold text-green-300">
          {user.correctAnswers}
        </p>
        <p className="text-sm">Correct</p>
      </motion.div>
      <motion.div
        className="bg-white bg-opacity-20 rounded-lg p-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <p className="text-3xl font-bold text-red-300">{user.wrongAnswers}</p>
        <p className="text-sm">Wrong</p>
      </motion.div>
    </div>
  </motion.div>
);

// QuestionList Component (unchanged)
const QuestionList = ({ questions, currentPage, setCurrentPage }) => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const questionsPerPage = 10;
  const currentQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  return (
    <motion.div
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-purple-300">Questions</h2>
      <div className="space-y-4">
        {currentQuestions.map((q) => (
          <div
            key={q.id}
            className="border border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              className="w-full text-left p-4 focus:outline-none hover:bg-white hover:bg-opacity-5 transition-colors duration-200 flex justify-between items-center"
              onClick={() =>
                setOpenQuestion(openQuestion === q.id ? null : q.id)
              }
            >
              <span className="font-medium text-white">{q.question}</span>
              <div className="flex items-center">
                <span
                  className={
                    q.score === 1 ? "text-green-400 mr-2" : "text-red-400 mr-2"
                  }
                >
                  Score: {q.score}
                </span>
                {openQuestion === q.id ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </button>
            {openQuestion === q.id && (
              <div className="p-4 bg-gray-800 border-t border-gray-700">
                <p className="mb-1 text-gray-300">
                  <span className="font-medium text-white">Your Answer:</span>{" "}
                  {q.userAnswer}
                </p>
                <p className="mb-1 text-gray-300">
                  <span className="font-medium text-white">
                    Correct Answer:
                  </span>{" "}
                  {q.correctAnswer}
                </p>
                <p
                  className={q.score === 1 ? "text-green-400" : "text-red-400"}
                >
                  {q.score === 1 ? "Correct" : "Incorrect"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
        >
          Previous
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {Math.ceil(questions.length / questionsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(questions.length / questionsPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(questions.length / questionsPerPage)
          }
          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

// Leaderboard Component (unchanged)
const Leaderboard = ({ leaderboardData, currentPage, setCurrentPage }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(leaderboardData.length / itemsPerPage);
  const currentLeaderboardData = leaderboardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-purple-300">
        Leaderboard
      </h2>
      <div className="space-y-4">
        {currentLeaderboardData.map((user, index) => (
          <div key={user.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2 text-white">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </span>
              {index < 3 && (
                <FaTrophy
                  className={`mr-2 ${
                    ["text-yellow-400", "text-gray-400", "text-yellow-700"][
                      index
                    ]
                  }`}
                />
              )}
              <span className="text-white">{user.name}</span>
            </div>
            <div className="text-right">
              <span className="text-blue-400 font-bold">{user.score}</span>
              <span className="text-gray-400 ml-2">({user.time} min)</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
        >
          Previous
        </button>
        <span className="text-gray-300">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

// AIRecommendations Component (unchanged)
const AIRecommendations = ({ score, totalQuestions }) => {
  const getRecommendations = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) {
      return [
        "Great job! Consider exploring more advanced topics.",
        "Try teaching others to reinforce your knowledge.",
        "Challenge yourself with timed quizzes to improve speed.",
      ];
    } else if (percentage >= 60) {
      return [
        "Review the questions you got wrong and study those topics.",
        "Practice more quizzes on similar subjects.",
        "Consider creating flashcards for key concepts.",
      ];
    } else {
      return [
        "Focus on understanding the fundamental concepts.",
        "Spend more time studying the subject material.",
        "Consider seeking help from a tutor or joining a study group.",
      ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <motion.div
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-purple-300 flex items-center">
          <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
          AI Recommendations
        </h2>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-px rounded-full">
          <div className="bg-gray-900 rounded-full px-3 py-1">
            <span className="text-sm font-semibold text-white flex items-center">
              <BeakerIcon className="h-4 w-4 mr-1" />
              GPT-4
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-px rounded-lg">
        <div className="bg-gray-900 rounded-lg p-4">
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// Main QuizResultPage Component
const QuizResultPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLeaderboardPage, setCurrentLeaderboardPage] = useState(1);

  useEffect(() => {
    document.body.classList.add(
      "bg-gradient-to-br",
      "from-indigo-900",
      "to-purple-900",
      "text-white"
    );
    return () =>
      document.body.classList.remove(
        "bg-gradient-to-br",
        "from-indigo-900",
        "to-purple-900",
        "text-white"
      );
  }, []);

  const user = {
    name: "John Doe",
    score: 8,
    totalQuestions: 10,
    correctAnswers: 8,
    wrongAnswers: 2,
  };

  const quizDetails = {
    title: "JavaScript Basics",
    duration: "30 minutes",
    difficulty: "Intermediate",
  };

  const questions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `What is the capital of ${
      ["France", "Germany", "Italy", "Spain", "UK"][i % 5]
    }?`,
    userAnswer: ["Paris", "Berlin", "Rome", "Madrid", "London"][
      Math.floor(Math.random() * 5)
    ],
    correctAnswer: ["Paris", "Berlin", "Rome", "Madrid", "London"][i % 5],
    score: Math.random() > 0.5 ? 1 : 0,
  }));

  const leaderboardData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    score: Math.floor(Math.random() * 10) + 1,
    time: Math.floor(Math.random() * 30) + 1,
  })).sort((a, b) => b.score - a.score || a.time - b.time);

  return (
    <>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Quiz Results
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 space-y-8">
              <UserQuizDetails user={user} quizDetails={quizDetails} />
              <QuestionList
                questions={questions}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <div className="space-y-8">
              <Leaderboard
                leaderboardData={leaderboardData}
                currentPage={currentLeaderboardPage}
                setCurrentPage={setCurrentLeaderboardPage}
              />
              <AIRecommendations
                score={user.score}
                totalQuestions={user.totalQuestions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResultPage;
