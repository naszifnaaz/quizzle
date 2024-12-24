import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function PublishSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-300">
              Your Quiz is Ready!
            </h3>
            <p className="text-gray-300 mb-4">
              Share this link with your audience:
            </p>
            <div className="flex">
              <input
                type="text"
                value="https://quizzle.com/your-awesome-quiz"
                readOnly
                className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300">
                Copy
              </button>
            </div>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Publish and Share with a Click
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Once your quiz is ready, publish it instantly. Share the unique
              link on social media, embed it on your website, or send it
              directly to participants.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transition duration-300 transform hover:scale-105">
              Learn About Sharing Options
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
