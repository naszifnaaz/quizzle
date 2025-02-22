import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your password reset logic here
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-between">
        <div>
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-purple-300 hover:text-purple-400 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Login
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
              Reset Password
            </h1>
            <p className="text-gray-300 text-lg">
              Enter your email and we'll send you instructions to reset your
              password
            </p>
          </div>

          {!isEmailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
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
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send reset instructions"}
                </button>
              </motion.div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                <CheckCircleIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Check Your Email
                </h3>
                <p className="text-gray-300">
                  We've sent password reset instructions to your email address.
                </p>
              </div>
              <button
                onClick={() => setIsEmailSent(false)}
                className="w-full bg-white bg-opacity-5 text-white p-4 rounded-xl font-semibold border border-gray-700 hover:bg-opacity-10 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Try another email
              </button>
            </motion.div>
          )}
        </motion.div>

        <div className="text-center text-gray-300 mt-8">
          Remember your password?{" "}
          <Link
            to="/auth/login"
            className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
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
                <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z" />
              </svg>
            </div>
          </div>

          {/* Feature text */}
          <div className="mt-8 space-y-6 text-center">
            <h2 className="text-2xl font-bold text-white">Password Recovery</h2>
            <p className="text-gray-300">
              Don't worry! It happens to the best of us. We'll help you get back
              into your account.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
