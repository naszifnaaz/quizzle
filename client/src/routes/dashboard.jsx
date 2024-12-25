import React, { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import QuizCard from "../components/quiz-card";
import ParticipatedQuizCard from "../components/participated-quiz-card";
import CreateQuizSlider from "../components/create";
import { NavBar } from "../components/shared/navbar";
import ToggleButton from "../components/toggle-button";
import { motion } from "framer-motion";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { login } from "../features/user.slice";
import { useAuth } from "@clerk/clerk-react";
import { getQuizzes } from "../features/quiz.slice";

const createdQuizzes = [
  {
    id: 1,
    title: "JavaScript Basics",
    questions: 10,
    participants: 150,
    status: "Published",
    timeLimit: 20,
  },
  {
    id: 2,
    title: "React Fundamentals",
    questions: 15,
    participants: 75,
    status: "Published",
    timeLimit: 30,
  },
  {
    id: 3,
    title: "CSS Tricks",
    questions: 8,
    participants: 0,
    status: "Draft",
    timeLimit: 15,
  },
  {
    id: 4,
    title: "Python for Beginners",
    questions: 12,
    participants: 200,
    status: "Published",
    timeLimit: 25,
  },
  {
    id: 5,
    title: "Data Structures",
    questions: 20,
    participants: 50,
    status: "Published",
    timeLimit: 40,
  },
  {
    id: 6,
    title: "Machine Learning Intro",
    questions: 5,
    participants: 0,
    status: "Draft",
    timeLimit: 10,
  },
];

const participatedQuizzes = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    questions: 20,
    participants: 300,
    status: "Completed",
    timeLimit: 40,
    score: 85,
    timeTaken: 35,
    completedDate: "2023-06-15",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    questions: 25,
    participants: 150,
    status: "Completed",
    timeLimit: 50,
    score: 92,
    timeTaken: 45,
    completedDate: "2023-06-20",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    questions: 15,
    participants: 200,
    status: "Completed",
    timeLimit: 30,
    score: 78,
    timeTaken: 28,
    completedDate: "2023-06-25",
  },
];

const availableQuizzes = [
  {
    id: 1,
    title: "Introduction to AI",
    questions: 15,
    participants: 500,
    status: "Available",
    timeLimit: 30,
  },
  {
    id: 2,
    title: "Blockchain Basics",
    questions: 12,
    participants: 300,
    status: "Available",
    timeLimit: 25,
  },
  {
    id: 3,
    title: "Cloud Computing Fundamentals",
    questions: 18,
    participants: 400,
    status: "Available",
    timeLimit: 35,
  },
  {
    id: 4,
    title: "Cybersecurity Essentials",
    questions: 20,
    participants: 600,
    status: "Available",
    timeLimit: 40,
  },
  {
    id: 5,
    title: "Data Science for Beginners",
    questions: 16,
    participants: 450,
    status: "Available",
    timeLimit: 30,
  },
  {
    id: 6,
    title: "Mobile App Development",
    questions: 14,
    participants: 350,
    status: "Available",
    timeLimit: 28,
  },
];

function Dashboard() {
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Created");
  const [currentPage, setCurrentPage] = useState(1);
  const { isSignedIn, user } = useUser();
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  const itemsPerPage = 6;

  // changing rtk states, and getting token
  async function handleUserLogin() {
    dispatch(
      login({
        clerkId: user?.id,
      })
    );

    const token = await getToken();
    dispatch(getQuizzes(token));
  }

  useEffect(() => {
    document.body.classList.add(
      "bg-gradient-to-br",
      "from-indigo-900",
      "to-purple-900",
      "text-white"
    );

    if (isSignedIn) handleUserLogin();

    return () => {
      document.body.classList.remove(
        "bg-gradient-to-br",
        "from-indigo-900",
        "to-purple-900",
        "text-white"
      );
    };
  }, [isSignedIn]);

  useEffect(() => {}, [async function handleLogin() {}]);

  const getQuizzesToDisplay = () => {
    let quizzes;
    switch (selectedOption) {
      case "Created":
        quizzes = createdQuizzes;
        break;
      case "Attempts":
        quizzes = participatedQuizzes;
        break;
      case "Available":
        quizzes = availableQuizzes;
        break;
      default:
        quizzes = [];
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return quizzes.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(
    (selectedOption === "Created"
      ? createdQuizzes.length
      : selectedOption === "Attempts"
      ? participatedQuizzes.length
      : availableQuizzes.length) / itemsPerPage
  );

  return (
    <div className="min-h-screen overflow-hidden">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            My Quizzes
          </h2>
          {isSignedIn ? (
            <button
              onClick={() => setIsCreateQuizOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Create New Quiz
            </button>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <ToggleButton
            selectedOption={selectedOption}
            onToggle={setSelectedOption}
          />
        </motion.div>

        {isSignedIn ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {getQuizzesToDisplay().map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {selectedOption === "Attempts" ? (
                    <ParticipatedQuizCard quiz={quiz} />
                  ) : (
                    <QuizCard quiz={quiz} />
                  )}
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-8 flex justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Welcome to Quizzle</h1>
            <p className="text-xl mb-8">
              Sign in to create and participate in quizzes!
            </p>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Sign In
              </button>
            </SignInButton>
          </motion.div>
        )}
      </main>

      <CreateQuizSlider
        isOpen={isCreateQuizOpen}
        onClose={() => setIsCreateQuizOpen(false)}
      />
    </div>
  );
}

export default Dashboard;
