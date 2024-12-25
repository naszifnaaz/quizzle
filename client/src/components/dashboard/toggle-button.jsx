import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const ToggleButton = ({ selectedOption, onToggle }) => {
  const options = [
    { name: "Created", icon: ClipboardDocumentListIcon },
    { name: "Attempts", icon: ClipboardDocumentCheckIcon },
    { name: "Available", icon: BookOpenIcon },
  ];

  return (
    <div className="flex justify-center">
      <motion.div
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-full p-1 flex"
        whileHover={{ scale: 1.05 }}
      >
        {options.map((option) => (
          <motion.button
            key={option.name}
            className={`px-6 py-3 rounded-full transition-colors duration-200 flex items-center ${
              selectedOption === option.name
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => onToggle(option.name)}
            whileTap={{ scale: 0.95 }}
          >
            <option.icon className="h-5 w-5 mr-2" />
            {option.name}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default ToggleButton;
