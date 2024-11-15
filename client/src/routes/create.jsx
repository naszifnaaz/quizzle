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

import { PlusCircleIcon } from "@heroicons/react/24/outline";

function CreateQuizSlider({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [timeLimit, setTimeLimit] = useState(10);
  const [questions, setQuestions] = useState([{ text: "", options: ["", ""] }]);

  // Create a ref for the Quiz Title input
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
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-1/2 lg:w-1/3 bg-white shadow-xl transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out overflow-y-auto`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex justify-between items-center">
            {" "}
            <PlusCircleIcon className="h-8 w-8 mr-2" />
            Create New Quiz
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full pl-10 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="numQuestions"
              className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full pl-10 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="timeLimit"
              className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full pl-10 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Questions
            </h3>
            {questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="mb-4 p-4 border border-gray-200 rounded-md"
              >
                <div className="relative mb-2">
                  <QuestionMarkCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, e.target.value)
                    }
                    placeholder={`Enter question ${qIndex + 1}`}
                    className="block w-full pl-12 py-3 text-lg font-semibold rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center mb-2 relative">
                    <ChevronRightIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      placeholder={`Enter option ${oIndex + 1}`}
                      className="flex-grow pl-10 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                    {question.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(qIndex, oIndex)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                {question.options.length < 4 && (
                  <button
                    type="button"
                    onClick={() => handleAddOption(qIndex)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Add Option
                  </button>
                )}
              </div>
            ))}
            {questions.length < numQuestions && (
              <button
                type="button"
                onClick={handleAddQuestion}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add Question
              </button>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex items-center w-1/2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              <LinkIcon className="h-5 w-5 mr-2" />
              Publish Quiz
            </button>
            <button
              type="button"
              className="flex items-center w-1/2 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition duration-300"
            >
              <ArchiveBoxIcon className="h-5 w-5 mr-2" />
              Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuizSlider;
