import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export function TakeQuizSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const quizzes = [
    {
      title: "Science Quiz",
      description: "Test your knowledge of basic scientific concepts.",
    },
    {
      title: "History Trivia",
      description: "Challenge yourself with questions about world history.",
    },
    {
      title: "Pop Culture Mania",
      description: "How well do you know movies, music, and celebrities?",
    },
  ];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.3 } },
      }}
      className="py-20 px-4 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500"
        >
          Take Quizzes Anytime, Anywhere
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl transform transition duration-500 hover:scale-105"
            >
              <h3 className="text-xl font-bold mb-4 text-purple-300">
                {quiz.title}
              </h3>
              <p className="text-gray-300 mb-6">{quiz.description}</p>
              <Link to={"/quiz/1"}>
                <button className="w-full bg-gradient-to-r from-yellow-500 to-pink-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-pink-700 transition duration-300 transform hover:scale-105">
                  Start Quiz
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
