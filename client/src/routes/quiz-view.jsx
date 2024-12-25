import { useState, useEffect } from "react";
import {
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

import { SignIn, useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { quizData } from "../data/quiz-data";

export default function QuizView() {
  const [username, setUsername] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit * 60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState({});
  const [quizStartTime, setQuizStartTime] = useState(null);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (quizStarted && !showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted, showResults]);

  useEffect(() => {
    // Add a class to the body for global styles
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

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (isSignedIn) {
      setQuizStarted(true);
      setQuizStartTime(Date.now());
      setUsername(user.username || user.firstName || "User");
    }
  };

  const handleAnswerSelect = (questionId, answerId) => {
    const question = quizData.questions.find((q) => q.id === questionId);
    if (!question) return;

    setUserAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      let newAnswers;

      if (question.multipleCorrect) {
        if (currentAnswers.includes(answerId)) {
          newAnswers = currentAnswers.filter((id) => id !== answerId);
        } else {
          newAnswers = [...currentAnswers, answerId];
        }
        if (newAnswers.length === question.correctAnswers.length) {
          setShowFeedback((prevFeedback) => ({
            ...prevFeedback,
            [questionId]: true,
          }));
        }
      } else {
        newAnswers = [answerId];
        setShowFeedback((prevFeedback) => ({
          ...prevFeedback,
          [questionId]: true,
        }));
      }

      return { ...prev, [questionId]: newAnswers };
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback((prev) => ({
        ...prev,
        [quizData.questions[currentQuestion].id]: true,
      }));
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const allAnswers = { ...userAnswers };
    quizData.questions.forEach((question) => {
      if (!allAnswers[question.id]) {
        allAnswers[question.id] = []; // Mark unattempted questions as wrong
      }
    });
    setUserAnswers(allAnswers);
    setShowResults(true);
    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    setTimeLeft(timeTaken); // Set the final time taken
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeLeft(quizData.timeLimit * 60);
    setShowFeedback({});
    setQuizStartTime(Date.now());
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (!quizStarted) {
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
              {isSignedIn ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuizStarted(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Start Quiz
                </motion.button>
              ) : (
                <div className="space-y-4">
                  <SignIn />
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  if (showResults) {
    navigate("/quiz-results");
  }

  const currentQuestionData = quizData.questions[currentQuestion];
  const userAnswersForCurrentQuestion =
    userAnswers[currentQuestionData.id] || [];
  const selectionsLeft = currentQuestionData.multipleCorrect
    ? currentQuestionData.correctAnswers.length -
      userAnswersForCurrentQuestion.length
    : 1 - userAnswersForCurrentQuestion.length;

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
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-xl w-full max-w-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            {quizData.title}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, {username}!</span>
            <div className="bg-blue-400 bg-opacity-20 text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </h2>
          <p className="text-gray-300 mb-2">{currentQuestionData.text}</p>
          {currentQuestionData.multipleCorrect && (
            <p className="text-sm text-blue-400 mb-4 flex items-center">
              <BookOpenIcon className="h-4 w-4 mr-2" />
              Multiple correct answers. Selections left: {selectionsLeft}
            </p>
          )}
          <div className="space-y-2">
            <AnimatePresence>
              {currentQuestionData.options.map((option) => {
                const isSelected = userAnswersForCurrentQuestion.includes(
                  option.id
                );
                const isCorrect = currentQuestionData.correctAnswers.includes(
                  option.id
                );
                const showOptionFeedback = showFeedback[currentQuestionData.id];
                let bgColor = "bg-white bg-opacity-5 hover:bg-opacity-10";
                if (showOptionFeedback) {
                  bgColor = isCorrect
                    ? "bg-green-400 bg-opacity-20"
                    : isSelected
                    ? "bg-red-400 bg-opacity-20"
                    : "bg-white bg-opacity-5";
                }
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      handleAnswerSelect(currentQuestionData.id, option.id)
                    }
                    disabled={showOptionFeedback}
                    className={`w-full p-4 ${bgColor} border border-gray-700 rounded-lg flex items-center justify-between transition-colors duration-200 text-white`}
                  >
                    <span>{option.text}</span>
                    {isSelected && (
                      <CheckIcon
                        className={`h-5 w-5 ${
                          showOptionFeedback && isCorrect
                            ? "text-green-400"
                            : "text-blue-400"
                        }`}
                      />
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:opacity-50 transition duration-200"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Previous
          </motion.button>
          {currentQuestion === quizData.questions.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmitQuiz}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-200"
            >
              Submit Quiz
              <CheckIcon className="h-5 w-5 ml-1" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextQuestion}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
            >
              Next
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
