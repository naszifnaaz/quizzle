import { motion } from "framer-motion";
import { LightBulbIcon, BeakerIcon } from "@heroicons/react/24/outline";

const AIRecommendations = ({ score, totalQuestions }) => {
  const percentage = (score / totalQuestions) * 100;

  const getRecommendations = () => {
    if (percentage >= 80) {
      return [
        "Great job! Consider exploring more advanced topics.",
        "Try teaching others to reinforce your knowledge.",
        "Challenge yourself with timed quizzes to improve speed.",
      ];
    } else if (percentage >= 60) {
      return [
        "Review the questions you got wrong and study those topics.",
        "Practice more quizzes on similar subjects.",
        "Consider creating flashcards for key concepts.",
      ];
    } else {
      return [
        "Focus on understanding the fundamental concepts.",
        "Spend more time studying the subject material.",
        "Consider seeking help from a tutor or joining a study group.",
      ];
    }
  };

  const recommendations = getRecommendations();
  const aiModel = "GPT-4"; // This could be dynamically set based on the actual AI model used

  return (
    <motion.div
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-purple-300 flex items-center">
          <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
          AI Recommendations
        </h2>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-px rounded-full">
          <div className="bg-gray-900 rounded-full px-3 py-1">
            <span className="text-sm font-semibold text-white flex items-center">
              <BeakerIcon className="h-4 w-4 mr-1" />
              {aiModel}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-px rounded-lg">
        <div className="bg-gray-900 rounded-lg p-4">
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <motion.li
                key={index}
                className="text-gray-300 flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <span className="text-purple-400 mr-2">•</span>
                {recommendation}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default AIRecommendations;
