const User = require("../models/user.model");
const Quiz = require("../models/quiz.model");
const Attempt = require("../models/attempt.model");

// Get all quizzes created by the logged-in user
exports.getMyQuizzes = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.auth.email }).populate(
      "created"
    );

    if (!user || !user.created || user.created.length === 0) {
      return res.status(200).json({
        email: req.auth.email,
        count: 0,
        created: [],
      });
    }

    res.status(200).json({
      count: user.created.length,
      created: user.created,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all quizzes attempted by the user
exports.getMyAttempts = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.auth.email }).populate({
      path: "attempted",
      populate: {
        path: "quiz", // Populate the quiz field in the attempted array
        model: "Quiz",
      },
    });

    if (!user || !user.attempted || user.attempted.length === 0) {
      return res.status(200).json({
        count: 0,
        attempted: [],
      });
    }

    res.status(200).json({
      count: user.attempted.length,
      attempted: user.attempted,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all published quizzes available for users
exports.getAvailableQuizzes = async (req, res) => {
  try {
    const available =
      (await Quiz.find({ status: "Published" }).populate("creator")) || [];
    res.status(200).json({
      count: available.length,
      available,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
