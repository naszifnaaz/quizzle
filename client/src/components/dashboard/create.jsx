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
  CheckBadgeIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { publishQuiz, saveQuizDraft } from "../../features/app.slice";
import { toast, Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";
import QuizUrlModal from "./quiz-url-modal";

function CreateQuizSlider({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [timeLimit, setTimeLimit] = useState(10);
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: [
        { id: "opt1", text: "" },
        { id: "opt2", text: "" },
      ],
      correctAnswers: [],
      multipleCorrect: false,
      hasImage: false,
      image: null,
    },
  ]);
  const [quizUrl, setQuizUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  const handleAddQuestion = () => {
    if (questions.length < numQuestions) {
      setQuestions([
        ...questions,
        {
          text: "",
          options: [
            { id: `opt1`, text: "" },
            { id: `opt2`, text: "" },
          ],
          correctAnswers: [],
          multipleCorrect: false,
          hasImage: false,
          image: null,
        },
      ]);
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionId, value) => {
    const newQuestions = [...questions];
    const optionIndex = newQuestions[questionIndex].options.findIndex(
      (opt) => opt.id === optionId
    );
    newQuestions[questionIndex].options[optionIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (questionIndex) => {
    if (questions[questionIndex].options.length < 4) {
      const newQuestions = [...questions];
      const newOptionId = `opt${
        newQuestions[questionIndex].options.length + 1
      }`;
      newQuestions[questionIndex].options.push({ id: newOptionId, text: "" });
      setQuestions(newQuestions);
    }
  };

  const handleRemoveOption = (questionIndex, optionId) => {
    if (questions[questionIndex].options.length > 2) {
      const newQuestions = [...questions];
      newQuestions[questionIndex].options = newQuestions[
        questionIndex
      ].options.filter((opt) => opt.id !== optionId);
      newQuestions[questionIndex].correctAnswers = newQuestions[
        questionIndex
      ].correctAnswers.filter((id) => id !== optionId);
      setQuestions(newQuestions);
    }
  };

  const handleMarkCorrect = (questionIndex, optionId) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];

    if (question.multipleCorrect) {
      const index = question.correctAnswers.indexOf(optionId);
      if (index > -1) {
        question.correctAnswers.splice(index, 1);
      } else {
        question.correctAnswers.push(optionId);
      }
    } else {
      question.correctAnswers = [optionId];
    }

    setQuestions(newQuestions);
  };

  const toggleMultipleCorrect = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].multipleCorrect =
      !newQuestions[questionIndex].multipleCorrect;
    newQuestions[questionIndex].correctAnswers = [];
    setQuestions(newQuestions);
  };

  const toggleHasImage = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].hasImage =
      !newQuestions[questionIndex].hasImage;
    if (!newQuestions[questionIndex].hasImage) {
      newQuestions[questionIndex].image = null;
    }
    setQuestions(newQuestions);
  };

  const handleImageUpload = (questionIndex, event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].image = reader.result;
        setQuestions(newQuestions);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (questionIndex, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].image = reader.result;
        setQuestions(newQuestions);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    // Validate title
    if (!title.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text.trim()) {
        toast.error(`Please enter the text for question ${i + 1}`);
        return;
      }
      if (questions[i].options.some((opt) => !opt.text.trim())) {
        toast.error(`Please fill in all options for question ${i + 1}`);
        return;
      }
      if (questions[i].correctAnswers.length === 0) {
        toast.error(
          `Please select at least one correct answer for question ${i + 1}`
        );
        return;
      }
    }

    const payload = {
      title,
      desc: "A quiz created using our platform.",
      timeLimit: timeLimit,
      questions: questions.map((q) => ({
        text: q.text,
        options: q.options,
        correctAnswers: q.correctAnswers,
        multipleCorrect: q.multipleCorrect,
        hasImage: q.hasImage,
        image: q.image,
      })),
    };

    try {
      const token = await getToken();
      const response = await dispatch(publishQuiz({ token, payload }));
      // Using a dummy quizUrl for now
      const dummyQuizUrl = "https://example.com/quiz/123456";
      setQuizUrl(dummyQuizUrl);
      setIsModalOpen(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      toast.error("An error occurred while publishing the quiz");
    }
  };

  const saveAsDraft = async () => {
    const payload = {
      title,
      desc: "A quiz created using our platform.",
      timeLimit: timeLimit,
      questions: questions.map((q) => ({
        text: q.text,
        options: q.options,
        correctAnswers: q.correctAnswers,
        multipleCorrect: q.multipleCorrect,
        hasImage: q.hasImage,
        image: q.image,
      })),
    };
    console.log("draft", payload);
    const token = await getToken();
    dispatch(saveQuizDraft({ token, payload }));
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
                    onChange={(e) =>
                      setNumQuestions(Number.parseInt(e.target.value))
                    }
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
                    onChange={(e) =>
                      setTimeLimit(Number.parseInt(e.target.value))
                    }
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
                    <div className="mb-2 flex items-center space-x-4">
                      <label className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={question.multipleCorrect}
                          onChange={() => toggleMultipleCorrect(qIndex)}
                          className="mr-2"
                        />
                        Allow multiple correct answers
                      </label>
                      <label className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={question.hasImage}
                          onChange={() => toggleHasImage(qIndex)}
                          className="mr-2"
                        />
                        Include image
                      </label>
                    </div>
                    {question.hasImage && (
                      <div
                        className="mb-2 p-4 border-2 border-dashed border-gray-400 rounded-md"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(qIndex, e)}
                      >
                        {question.image ? (
                          <img
                            src={question.image || "/placeholder.svg"}
                            alt="Question"
                            className="max-w-full h-auto mb-2"
                          />
                        ) : (
                          <div className="text-center text-gray-400">
                            <PhotoIcon className="mx-auto h-12 w-12 mb-2" />
                            <p>
                              Drag and drop an image here, or click to select
                            </p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(qIndex, e)}
                          className="hidden"
                          id={`image-upload-${qIndex}`}
                        />
                        <label
                          htmlFor={`image-upload-${qIndex}`}
                          className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
                        >
                          {question.image ? "Change Image" : "Upload Image"}
                        </label>
                      </div>
                    )}
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center mb-2 relative"
                      >
                        <ChevronRightIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) =>
                            handleOptionChange(
                              qIndex,
                              option.id,
                              e.target.value
                            )
                          }
                          placeholder={`Enter option ${option.id}`}
                          className="flex-grow pl-10 py-2 bg-white bg-opacity-10 rounded-md border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => handleMarkCorrect(qIndex, option.id)}
                          className={`ml-2 p-1 rounded ${
                            question.correctAnswers.includes(option.id)
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          <CheckBadgeIcon className="h-5 w-5" />
                        </button>
                        {question.options.length > 2 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() =>
                              handleRemoveOption(qIndex, option.id)
                            }
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
                  onClick={handlePublish}
                  className="flex items-center w-1/2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md hover:from-green-600 hover:to-blue-600 transition duration-300"
                >
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Publish Quiz
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={saveAsDraft}
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
      <Toaster />
      {isModalOpen && (
        <QuizUrlModal
          quizUrl={quizUrl}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            onClose();
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default CreateQuizSlider;
