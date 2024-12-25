import { useState, useEffect, useRef } from "react";
import {
  XMarkIcon,
  TrashIcon,
  PencilIcon,
  ClockIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
  ArchiveBoxIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

function CreateQuizSlider({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [timeLimit, setTimeLimit] = useState(10);
  const [questions, setQuestions] = useState([{ text: "", options: ["", ""] }]);

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  const handleAddQuestion = () => {
    if (questions.length < numQuestions) {
      setQuestions([...questions, { text: "", options: ["", ""] }]);
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (questionIndex) => {
    if (questions[questionIndex].options.length < 4) {
      const newQuestions = [...questions];
      newQuestions[questionIndex].options.push("");
      setQuestions(newQuestions);
    }
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    if (questions[questionIndex].options.length > 2) {
      const newQuestions = [...questions];
      newQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, numQuestions, timeLimit, questions });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/2 bg-gradient-to-br from-indigo-900 to-purple-900 shadow-2xl overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-white flex items-center"
              >
                <DocumentTextIcon className="h-8 w-8 mr-2 text-blue-400" />
                Create New Quiz
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </motion.button>
            </div>
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
            >
              <div className="mb-4 relative">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Quiz Title
                </label>
                <div className="relative">
                  <DocumentTextIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="title"
                    value={title}
                    ref={titleInputRef}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter quiz title"
                    className="w-full pl-10 py-2 bg-white bg-opacity-10 rounded-md border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="numQuestions"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Number of Questions
                </label>
                <div className="relative">
                  <PencilIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    id="numQuestions"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    min="1"
                    placeholder="Enter number of questions"
                    className="w-full pl-10 py-2 bg-white bg-opacity-10 rounded-md border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="timeLimit"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Time Limit (minutes)
                </label>
                <div className="relative">
                  <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    id="timeLimit"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                    min="1"
                    placeholder="Enter time limit in minutes"
                    className="w-full pl-10 py-2 bg-white bg-opacity-10 rounded-md border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-white mb-2">
                  Questions
                </h3>
                {questions.map((question, qIndex) => (
                  <motion.div
                    key={qIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * qIndex }}
                    className="mb-4 p-4 bg-white bg-opacity-5 rounded-md"
                  >
                    <div className="relative mb-2">
                      <QuestionMarkCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) =>
                          handleQuestionChange(qIndex, e.target.value)
                        }
                        placeholder={`Enter question ${qIndex + 1}`}
                        className="w-full pl-12 py-3 bg-white bg-opacity-10 rounded-md border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className="flex items-center mb-2 relative"
                      >
                        <ChevronRightIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e.target.value)
                          }
                          placeholder={`Enter option ${oIndex + 1}`}
                          className="flex-grow pl-10 py-2 bg-white bg-opacity-10 rounded-md border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        {question.options.length > 2 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => handleRemoveOption(qIndex, oIndex)}
                            className="ml-2 text-red-400 hover:text-red-300"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </motion.button>
                        )}
                      </div>
                    ))}
                    {question.options.length < 4 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => handleAddOption(qIndex)}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        + Add Option
                      </motion.button>
                    )}
                  </motion.div>
                ))}
                {questions.length < numQuestions && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleAddQuestion}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Add Question
                  </motion.button>
                )}
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center w-1/2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md hover:from-green-600 hover:to-blue-600 transition duration-300"
                >
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Publish Quiz
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="flex items-center w-1/2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition duration-300"
                >
                  <ArchiveBoxIcon className="h-5 w-5 mr-2" />
                  Save as Draft
                </motion.button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CreateQuizSlider;
