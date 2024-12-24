import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  PlusCircleIcon,
  ShareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: PlusCircleIcon,
      title: "Create",
      description:
        "Design your quiz with our intuitive builder. Add questions, set options, and customize the look.",
    },
    {
      icon: ShareIcon,
      title: "Publish",
      description:
        "Share your quiz with a single click. Get a unique link to distribute to your audience.",
    },
    {
      icon: CheckCircleIcon,
      title: "Take",
      description:
        "Participants can easily access and complete the quiz. Get instant results and feedback.",
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
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 transform transition duration-500 hover:scale-105"
            >
              <feature.icon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-purple-300">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
