import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import QuizCard from "../components/quiz-card";
import ParticipatedQuizCard from "../components/participated-quiz-card";
import CreateQuizSlider from "../components/create";
import { NavBar } from "../components/shared/navbar";
import ToggleButton from "../components/toggle-button";

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

function Dashboard() {
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [showCreated, setShowCreated] = useState(true);

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

        <div className="mb-6">
          <ToggleButton
            leftOption="Created"
            rightOption="Participated"
            isLeftSelected={showCreated}
            onToggle={() => setShowCreated(!showCreated)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {showCreated
            ? createdQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))
            : participatedQuizzes.map((quiz) => (
                <ParticipatedQuizCard key={quiz.id} quiz={quiz} />
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
