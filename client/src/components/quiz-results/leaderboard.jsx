import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

const Leaderboard = ({ currentPage, setCurrentPage }) => {
  // Dummy data for leaderboard
  const leaderboardData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    score: Math.floor(Math.random() * 10) + 1,
    time: Math.floor(Math.random() * 30) + 1,
  })).sort((a, b) => b.score - a.score || a.time - b.time);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(leaderboardData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = leaderboardData.slice(startIndex, endIndex);

  const getTrophyColor = (rank) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-yellow-700";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className="flex-grow bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-purple-300">
        Leaderboard
      </h2>
      <div className="h-64 overflow-y-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 text-left text-gray-300 w-1/6">Rank</th>
              <th className="py-2 text-left text-gray-300 w-2/6">Name</th>
              <th className="py-2 text-right text-gray-300 w-1/6">Score</th>
              <th className="py-2 text-right text-gray-300 w-2/6">
                Time (min)
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => (
              <motion.tr
                key={user.id}
                className={`border-b border-gray-700 last:border-b-0 ${
                  index < 3 ? "font-semibold" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-2 flex items-center text-white truncate">
                  {startIndex + index + 1}
                  {index < 3 && (
                    <FaTrophy
                      className={`ml-2 ${getTrophyColor(
                        startIndex + index + 1
                      )}`}
                    />
                  )}
                </td>
                <td className="py-2 text-white truncate">{user.name}</td>
                <td className="py-2 text-right text-white truncate">
                  {user.score}
                </td>
                <td className="py-2 text-right text-white truncate">
                  {user.time}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
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
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
