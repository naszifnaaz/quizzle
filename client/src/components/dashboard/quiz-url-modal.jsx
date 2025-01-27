import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ClipboardIcon,
  ShareIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

function QuizUrlModal({ quizUrl, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(quizUrl);
    setCopied(true);
    toast.success("Quiz URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out my quiz!",
          text: "I created a quiz. Can you solve it?",
          url: quizUrl,
        })
        .then(() => {
          toast.success("Quiz shared successfully!");
        })
        .catch((error) => {
          toast.error("Error sharing quiz");
        });
    } else {
      toast.error("Sharing is not supported on this device");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white flex items-center"
                >
                  <LinkIcon className="h-8 w-8 mr-2 text-blue-400" />
                  Quiz Published!
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
              <p className="text-gray-300 mb-4">
                Your quiz is now live. Share it with others using this link:
              </p>
              <div className="flex items-center bg-white bg-opacity-10 rounded-md p-2 mb-6">
                <input
                  type="text"
                  value={quizUrl}
                  readOnly
                  className="flex-grow bg-transparent outline-none text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className={`ml-2 p-2 rounded-md ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  <ClipboardIcon className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition duration-300 shadow-lg"
                >
                  <ShareIcon className="h-5 w-5 mr-2" />
                  Share Quiz
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default QuizUrlModal;
