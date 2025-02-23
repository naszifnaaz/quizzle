import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { userRegister } from "../features/app.slice";
import { toast } from "react-hot-toast";

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((store) => store.isLoading);

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setRegisterForm({ ...registerForm, [id]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(registerForm))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.message || "Registration failed");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex">
      {/* Left Section - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500/10 to-purple-600/10 items-center justify-center p-16"
      >
        <div className="relative w-full max-w-lg">
          {/* Decorative circles */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

          {/* Placeholder illustration */}
          <div className="relative">
            {/* Replace this div with your undraw illustration later */}
            <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 backdrop-blur-sm flex items-center justify-center p-8">
              <svg
                className="w-full h-full text-white/40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
          </div>

          {/* Feature text */}
          <div className="mt-8 space-y-6 text-center">
            <h2 className="text-2xl font-bold text-white">
              Join Our Community
            </h2>
            <p className="text-gray-300">
              Create an account to start creating and sharing quizzes with the
              world.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-between">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-sm text-purple-300 hover:text-purple-400 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto space-y-8"
        >
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Create Account
            </h1>
            <p className="text-gray-300 text-lg">
              Start your journey with us today
            </p>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              className="w-full bg-white bg-opacity-5 text-white p-4 rounded-xl font-semibold border border-gray-700 hover:bg-opacity-10 transition duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <UserCircleIcon className="h-5 w-5" />
              <span>Sign up with Google</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-[#0F172A]">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label
                htmlFor="name"
                className="block text-sm text-gray-300 font-medium"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-white bg-opacity-5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="John Doe"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 font-medium"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-white bg-opacity-5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="m@example.com"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-white bg-opacity-5 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </motion.div>
          </form>
        </motion.div>

        <div className="text-center text-gray-300 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
