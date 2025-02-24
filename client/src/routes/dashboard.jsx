import CreatedQuizCard from "../components/dashboard/created-card";
import ParticipatedQuizCard from "../components/dashboard/participated-card";
import AvailableQuizCard from "../components/dashboard/available-card";
import CreateQuizSlider from "../components/dashboard/create";
import ToggleButton from "../components/dashboard/toggle-button";
import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAvailableQuizzes,
  fetchMyAttempts,
  fetchMyQuizzes,
} from "../features/app.slice";
import EmptyState from "../components/dashboard/empty-state";
import emptyImage from "../assets/empty.svg";
import { Link } from "react-router-dom";

function Dashboard() {
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Created");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const createdQuizzes =
    useSelector((store) => store.createdQuizzes.created) || [];
  // const participatedQuizzes =
  //   useSelector((store) => store.attemptedQuizzes.attempted) || [];
  const participatedQuizzes = [
    {
      quiz: {
        id: "dummy-quiz-1",
        title: "Sample Quiz Title",
      },
      score: 85,
      timeTaken: 12,
      rank: 3,
      creator: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=test",
      },
      id: "dummy-participation-1",
    },
  ];

  const availableQuizzes =
    useSelector((store) => store.availableQuizzes.available) || [];
  const token = useSelector((store) => store.token);
  const isLoggedIn = useSelector((store) => store.isLoggedIn);

  const itemsPerPage = 6;

  useEffect(() => {
    if (token) {
      dispatch(fetchMyQuizzes(token));
      dispatch(fetchMyAttempts(token));
      dispatch(fetchAvailableQuizzes(token));
    }
  }, [token, dispatch]);

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
          {isLoggedIn ? (
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

        {isLoggedIn ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {getQuizzesToDisplay().length > 0 ? (
                getQuizzesToDisplay().map((quiz, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {selectedOption === "Attempts" ? (
                      <ParticipatedQuizCard quiz={quiz} />
                    ) : selectedOption === "Available" ? (
                      <AvailableQuizCard quiz={quiz} />
                    ) : (
                      <CreatedQuizCard quiz={quiz} />
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3">
                  <EmptyState
                    message={
                      selectedOption === "Created"
                        ? "You haven't created any quizzes yet"
                        : selectedOption === "Attempts"
                        ? "You haven't attempted any quizzes yet"
                        : "No quizzes available at the moment"
                    }
                    imageSrc={
                      selectedOption === "Created"
                        ? emptyImage
                        : selectedOption === "Attempts"
                        ? emptyImage
                        : emptyImage
                    }
                  />
                </div>
              )}
            </motion.div>
            {getQuizzesToDisplay().length > 0 && (
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
            )}
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
            <Link to={"/login"}>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Sign In
              </button>
            </Link>
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
