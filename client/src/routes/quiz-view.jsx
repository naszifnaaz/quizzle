import { useState, useEffect } from "react";
import {
  UserIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Mock quiz data
const quizData = {
  title: "JavaScript Fundamentals",
  timeLimit: 10, // in minutes
  questions: [
    {
      id: 1,
      text: "Which of the following is/are correct way(s) to declare a variable in JavaScript?",
      options: [
        { id: "a", text: "var x = 5;" },
        { id: "b", text: "let y = 10;" },
        { id: "c", text: "const z = 15;" },
        { id: "d", text: "All of the above" },
      ],
      correctAnswers: ["d"],
      multipleCorrect: false,
    },
    {
      id: 2,
      text: "Which of these are looping structures in JavaScript?",
      options: [
        { id: "a", text: "for" },
        { id: "b", text: "while" },
        { id: "c", text: "do-while" },
        { id: "d", text: "foreach" },
      ],
      correctAnswers: ["a", "b", "c"],
      multipleCorrect: true,
    },
    {
      id: 3,
      text: "What does the 'typeof' operator return for an array?",
      options: [
        { id: "a", text: "array" },
        { id: "b", text: "object" },
        { id: "c", text: "list" },
      ],
      correctAnswers: ["b"],
      multipleCorrect: false,
    },
  ],
};

export default function QuizView() {
  const [username, setUsername] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit * 60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState({});
  const [quizStartTime, setQuizStartTime] = useState(null);

  useEffect(() => {
    if (quizStarted && !showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted, showResults]);

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setQuizStarted(true);
      setQuizStartTime(Date.now());
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {quizData.title}
          </h1>
          <div className="flex justify-between mb-6">
            <div className="flex items-center text-gray-600">
              <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
              <span>{quizData.questions.length} Questions</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{quizData.timeLimit} Minutes</span>
            </div>
          </div>
          <form onSubmit={handleStartQuiz} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your username to start the quiz
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="Your username"
                  required
                />
                <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Start Quiz
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = quizData.questions.reduce((acc, question) => {
      const userAnswer = userAnswers[question.id] || [];
      const isCorrect =
        JSON.stringify(userAnswer.sort()) ===
        JSON.stringify(question.correctAnswers.sort());
      return acc + (isCorrect ? 1 : 0);
    }, 0);

    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    const correctAnswers = score;
    const incorrectAnswers = quizData.questions.length - score;

    const pieChartData = [
      { name: "Correct", value: correctAnswers, color: "#4CAF50" },
      { name: "Incorrect", value: incorrectAnswers, color: "#F44336" },
    ];

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Quiz Results
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Performance Statistics
              </h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">Username:</span>
                  <span className="ml-2">{username}</span>
                </p>
                <p className="flex items-center">
                  <CheckIcon className="h-5 w-5 mr-2 text-green-500" />
                  <span className="font-medium">Score:</span>
                  <span className="ml-2">
                    {score} out of {quizData.questions.length}
                  </span>
                </p>
                <p className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-purple-500" />
                  <span className="font-medium">Time Taken:</span>
                  <span className="ml-2">{formatTime(timeTaken)}</span>
                </p>
                <p className="flex items-center">
                  <QuestionMarkCircleIcon className="h-5 w-5 mr-2 text-yellow-500" />
                  <span className="font-medium">Correct Answers:</span>
                  <span className="ml-2">{correctAnswers}</span>
                </p>
                <p className="flex items-center">
                  <QuestionMarkCircleIcon className="h-5 w-5 mr-2 text-red-500" />
                  <span className="font-medium">Incorrect Answers:</span>
                  <span className="ml-2">{incorrectAnswers}</span>
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Score Distribution</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Detailed Answers</h2>
            {quizData.questions.map((question, index) => {
              const userAnswer = userAnswers[question.id] || [];
              const isCorrect =
                JSON.stringify(userAnswer.sort()) ===
                JSON.stringify(question.correctAnswers.sort());
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-md ${
                    isCorrect ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <p className="font-medium mb-2">
                    Question {index + 1}: {question.text}
                  </p>
                  <p className="text-sm">
                    Your answer:{" "}
                    {userAnswer
                      .map(
                        (id) =>
                          question.options.find((opt) => opt.id === id)?.text
                      )
                      .join(", ")}
                  </p>
                  <p className="text-sm">
                    Correct answer:{" "}
                    {question.correctAnswers
                      .map(
                        (id) =>
                          question.options.find((opt) => opt.id === id)?.text
                      )
                      .join(", ")}
                  </p>
                </div>
              );
            })}
          </div>
          {score / quizData.questions.length < 0.6 && (
            <div className="mt-8 p-4 bg-yellow-100 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Need to improve?</h3>
              <p className="mb-2">
                Here are some resources to help you prepare better:
              </p>
              <ul className="list-disc list-inside">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    JavaScript Fundamentals Course
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    MDN Web Docs: JavaScript Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    JavaScript: Understanding the Weird Parts
                  </a>
                </li>
              </ul>
            </div>
          )}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleRetryQuiz}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = quizData.questions[currentQuestion];
  const userAnswersForCurrentQuestion =
    userAnswers[currentQuestionData.id] || [];
  const selectionsLeft = currentQuestionData.multipleCorrect
    ? currentQuestionData.correctAnswers.length -
      userAnswersForCurrentQuestion.length
    : 1 - userAnswersForCurrentQuestion.length;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{quizData.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {username}!</span>
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </h2>
          <p className="text-gray-700 mb-2">{currentQuestionData.text}</p>
          {currentQuestionData.multipleCorrect && (
            <p className="text-sm text-blue-600 mb-4 flex items-center">
              <BookOpenIcon className="h-4 w-4 mr-2" />
              Multiple correct answers. Selections left: {selectionsLeft}
            </p>
          )}
          <div className="space-y-2">
            {currentQuestionData.options.map((option) => {
              const isSelected = userAnswersForCurrentQuestion.includes(
                option.id
              );
              const isCorrect = currentQuestionData.correctAnswers.includes(
                option.id
              );
              const showOptionFeedback = showFeedback[currentQuestionData.id];
              let bgColor = "bg-white hover:bg-gray-50";
              if (showOptionFeedback) {
                bgColor = isCorrect
                  ? "bg-green-100"
                  : isSelected
                  ? "bg-red-100"
                  : "bg-white";
              }
              return (
                <button
                  key={option.id}
                  onClick={() =>
                    handleAnswerSelect(currentQuestionData.id, option.id)
                  }
                  disabled={showOptionFeedback}
                  className={`w-full p-4 ${bgColor} border border-gray-200 rounded-lg flex items-center justify-between transition-colors duration-200`}
                >
                  <span>{option.text}</span>
                  {isSelected && (
                    <CheckIcon
                      className={`h-5 w-5 ${
                        showOptionFeedback && isCorrect
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:opacity-50 transition duration-200"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Previous
          </button>
          {currentQuestion === quizData.questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-200"
            >
              Submit Quiz
              <CheckIcon className="h-5 w-5 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
            >
              Next
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
