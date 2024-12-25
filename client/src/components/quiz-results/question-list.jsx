import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const QuestionList = () => {
  const questions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `What is the capital of ${
      [
        "France",
        "Germany",
        "Italy",
        "Spain",
        "UK",
        "Portugal",
        "Netherlands",
        "Belgium",
        "Sweden",
        "Norway",
        "Denmark",
        "Finland",
        "Poland",
        "Austria",
        "Switzerland",
        "Greece",
        "Turkey",
        "Russia",
        "Ukraine",
        "Romania",
      ][i]
    }?`,
    userAnswer: [
      "Paris",
      "Berlin",
      "Rome",
      "Madrid",
      "London",
      "Lisbon",
      "Amsterdam",
      "Brussels",
      "Stockholm",
      "Oslo",
      "Copenhagen",
      "Helsinki",
      "Warsaw",
      "Vienna",
      "Bern",
      "Athens",
      "Ankara",
      "Moscow",
      "Kyiv",
      "Bucharest",
    ][Math.floor(Math.random() * 20)],
    correctAnswer: [
      "Paris",
      "Berlin",
      "Rome",
      "Madrid",
      "London",
      "Lisbon",
      "Amsterdam",
      "Brussels",
      "Stockholm",
      "Oslo",
      "Copenhagen",
      "Helsinki",
      "Warsaw",
      "Vienna",
      "Bern",
      "Athens",
      "Ankara",
      "Moscow",
      "Kyiv",
      "Bucharest",
    ][i],
    score: Math.random() > 0.5 ? 1 : 0,
  }));

  const [openQuestion, setOpenQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <motion.div
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-purple-300">Questions</h2>
      <div className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {currentQuestions.map((q) => (
            <motion.div
              key={q.id}
              className="border border-gray-700 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (q.id % questionsPerPage) * 0.05 }}
            >
              <button
                className="w-full text-left p-4 focus:outline-none hover:bg-white hover:bg-opacity-5 transition-colors duration-200 flex justify-between items-center"
                onClick={() => toggleQuestion(q.id)}
              >
                <span className="font-medium text-white">{q.question}</span>
                <div className="flex items-center">
                  <span
                    className={
                      q.score === 1
                        ? "text-green-400 mr-2"
                        : "text-red-400 mr-2"
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
              <AnimatePresence>
                {openQuestion === q.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-800 border-t border-gray-700"
                  >
                    <p className="mb-1 text-gray-300">
                      <span className="font-medium text-white">
                        Your Answer:
                      </span>{" "}
                      {q.userAnswer}
                    </p>
                    <p className="mb-1 text-gray-300">
                      <span className="font-medium text-white">
                        Correct Answer:
                      </span>{" "}
                      {q.correctAnswer}
                    </p>
                    <p
                      className={
                        q.score === 1 ? "text-green-400" : "text-red-400"
                      }
                    >
                      {q.score === 1 ? "Correct" : "Incorrect"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
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

export default QuestionList;
