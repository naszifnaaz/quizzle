import {
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ParticipatedQuizCard({ quiz }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {quiz.title}
        </h3>
        <div className="flex flex-col space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-500" />
            <span>{quiz.questions} Questions</span>
          </div>
          <div className="flex items-center">
            <ChartBarIcon className="h-5 w-5 mr-2 text-orange-500" />
            <span>Score: {quiz.score}%</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-purple-500" />
            <span>Time Taken: {quiz.timeTaken} minutes</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
            <span>Completed on: {quiz.completedDate}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
            Completed
          </span>
          <Link to={`/report/1/user1`}>
            <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out transform hover:scale-110">
              View Results
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
