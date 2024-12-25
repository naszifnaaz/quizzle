import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserDetails from "../components/quiz-results/user-details";
import QuizDetails from "../components/quiz-results/quiz-details";
import Leaderboard from "../components/quiz-results/leaderboard";
import QuestionList from "../components/quiz-results/question-list";
import AIRecommendations from "../components/quiz-results/ai-recommendations";

const QuizResultPage = () => {
  const [currentLeaderboardPage, setCurrentLeaderboardPage] = useState(1);

  useEffect(() => {
    document.body.classList.add(
      "bg-gradient-to-br",
      "from-indigo-900",
      "to-purple-900",
      "text-white"
    );

    return () => {
      document.body.classList.remove(
        "bg-gradient-to-br",
        "from-indigo-900",
        "to-purple-900",
        "text-white"
      );
    };
  }, []);

  // Dummy data
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          variants={itemVariants}
        >
          Quiz Results
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            className="flex flex-col space-y-8"
            variants={itemVariants}
          >
            <UserDetails user={user} />
            <QuizDetails details={quizDetails} />
            <Leaderboard
              currentPage={currentLeaderboardPage}
              setCurrentPage={setCurrentLeaderboardPage}
            />
          </motion.div>
          <motion.div className="flex flex-col" variants={itemVariants}>
            <QuestionList />
          </motion.div>
        </div>
        <motion.div variants={itemVariants}>
          <AIRecommendations
            score={user.score}
            totalQuestions={user.totalQuestions}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuizResultPage;
