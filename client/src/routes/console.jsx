import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import QuizCard from "./quiz-card";
import CreateQuizSlider from "./create";
import { NavBar } from "./shared/navbar";

const quizzes = [
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

function Dashboard() {
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">My Quizzes</h2>
          <button
            onClick={() => setIsCreateQuizOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center shadow-md hover:shadow-lg"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Create New Quiz
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </main>

      <CreateQuizSlider
        isOpen={isCreateQuizOpen}
        onClose={() => setIsCreateQuizOpen(false)}
      />
    </div>
  );
}

export default Dashboard;
