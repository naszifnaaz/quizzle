import { useParams, Link } from "react-router-dom";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { NavBar } from "../components/shared/navbar";

const mockReport = {
  username: "user1",
  quizTitle: "JavaScript Basics",
  score: 8,
  totalQuestions: 10,
  timeTaken: 15,
  answers: [
    {
      question: "What is JavaScript?",
      userAnswer: "A programming language",
      correctAnswer: "A programming language",
      isCorrect: true,
    },
    {
      question: "What is a variable?",
      userAnswer: "A container for data",
      correctAnswer: "A container for data",
      isCorrect: true,
    },
    {
      question: "What is a function?",
      userAnswer: "A block of code",
      correctAnswer: "A block of code",
      isCorrect: true,
    },
    {
      question: "What is an array?",
      userAnswer: "A list of items",
      correctAnswer: "A list of items",
      isCorrect: true,
    },
    {
      question: "What is an object?",
      userAnswer: "A collection of properties",
      correctAnswer: "A collection of properties",
      isCorrect: true,
    },
    {
      question: "What is a loop?",
      userAnswer: "A way to repeat code",
      correctAnswer: "A way to repeat code",
      isCorrect: true,
    },
    {
      question: "What is a conditional statement?",
      userAnswer: "A way to make decisions",
      correctAnswer: "A way to make decisions",
      isCorrect: true,
    },
    {
      question: "What is the DOM?",
      userAnswer: "Document Object Model",
      correctAnswer: "Document Object Model",
      isCorrect: true,
    },
    {
      question: "What is event handling?",
      userAnswer: "Responding to user actions",
      correctAnswer: "Responding to user interactions",
      isCorrect: false,
    },
    {
      question: "What is AJAX?",
      userAnswer: "Asynchronous JavaScript",
      correctAnswer: "Asynchronous JavaScript and XML",
      isCorrect: false,
    },
  ],
};

export default function ParticipantReport() {
  const { quizId, username } = useParams();
  const report = mockReport; // In a real app, you'd fetch this data based on quizId and username

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to={`/quiz/${quizId}`}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Quiz Details
        </Link>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Participant Report
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-lg font-semibold">{report.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quiz</p>
              <p className="text-lg font-semibold">{report.quizTitle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Score</p>
              <p className="text-lg font-semibold">
                {report.score} / {report.totalQuestions}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time Taken</p>
            <p className="text-lg font-semibold">{report.timeTaken} minutes</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Answers</h3>
        <div className="space-y-6">
          {report.answers.map((answer, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2">
                Question {index + 1}: {answer.question}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">User's Answer</p>
                  <p
                    className={`text-md ${
                      answer.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {answer.userAnswer}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Correct Answer</p>
                  <p className="text-md text-green-600">
                    {answer.correctAnswer}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {answer.isCorrect ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
                )}
                <span
                  className={`font-semibold ${
                    answer.isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {answer.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
