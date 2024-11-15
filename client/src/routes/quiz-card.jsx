import {
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function QuizCard({ quiz }) {
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
            <UserIcon className="h-5 w-5 mr-2 text-green-500" />
            <span>{quiz.participants} Participants</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-purple-500" />
            <span>{quiz.timeLimit} Minutes</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              quiz.status === "Published"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {quiz.status}
          </span>
          <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out transform hover:scale-110">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
