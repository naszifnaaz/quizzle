import {
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ToggleButton = ({
  leftOption,
  rightOption,
  isLeftSelected,
  onToggle,
}) => {
  return (
    <div className="flex justify-center">
      <motion.div
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-full p-1 flex"
        whileHover={{ scale: 1.05 }}
      >
        <motion.button
          className={`px-6 py-3 rounded-full transition-colors duration-200 flex items-center ${
            isLeftSelected
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => isLeftSelected || onToggle()}
          whileTap={{ scale: 0.95 }}
        >
          <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
          {leftOption}
        </motion.button>
        <motion.button
          className={`px-6 py-3 rounded-full transition-colors duration-200 flex items-center ${
            !isLeftSelected
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => !isLeftSelected || onToggle()}
          whileTap={{ scale: 0.95 }}
        >
          <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
          {rightOption}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ToggleButton;
