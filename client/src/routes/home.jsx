"use client";

import { useEffect } from "react";
import {
  PlusCircleIcon,
  ShareIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { NavBar } from "../components/shared/navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function QuizBuilderLandingPage() {
  useEffect(() => {
    // Add a class to the body for global styles
    document.body.classList.add(
      "bg-gradient-to-br",
      "from-indigo-900",
      "to-purple-900",
      "text-white"
    );

    return () => {
      document.body.classList.remove(
        "bg-gradient-to-br",
        "from-indigo-900",
        "to-purple-900",
        "text-white"
      );
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CreateQuizSection />
        <PublishSection />
        <TakeQuizSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
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
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-white"
        >
          Create, Share, and Take Quizzes with Ease
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Quizzle is the ultimate platform for creating engaging quizzes,
          sharing them with the world, and testing knowledge on any topic.
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link to={"/dashboard"}>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Get Started
            </button>
          </Link>
          <button className="border border-purple-400 text-purple-400 px-8 py-4 rounded-full font-semibold hover:bg-purple-400 hover:text-white transition duration-300 transform hover:scale-105">
            Learn More
          </button>
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </div>
    </motion.section>
  );
}

function FeaturesSection() {
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

function CreateQuizSection() {
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
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
              Create Engaging Quizzes in Minutes
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our user-friendly interface makes it simple to craft beautiful and
              interactive quizzes on any topic. Add images, set time limits, and
              choose from various question types.
            </p>
            <Link to={"/dashboard"}>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition duration-300 transform hover:scale-105">
                Start Creating
              </button>
            </Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your question here"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
              />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <input
                    key={num}
                    type="text"
                    placeholder={`Option ${num}`}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                  />
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105">
                Add Question
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function PublishSection() {
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

function TakeQuizSection() {
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
              <Link to={"/quiz"}>
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

function CTASection() {
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
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Ready to Start Quizzing?
        </motion.h2>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Join thousands of educators, trainers, and curious minds who are
          already using Quizzle to create and share knowledge.
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105">
            Sign Up Now
          </button>
          <button className="border border-purple-400 text-purple-400 px-8 py-4 rounded-full font-semibold hover:bg-purple-400 hover:text-white transition duration-300 transform hover:scale-105 flex items-center justify-center">
            View Plans
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-400 mb-4 sm:mb-0">
          © 2024 Quizzle. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition duration-300"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
