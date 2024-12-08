const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number,
      required: true,
    },
    answers: [
      {
        question: String,
        userAnswer: [String],
        correctAnswer: [String],
        isCorrect: Boolean,
      },
    ],
    completedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Attempt = mongoose.model("Attempt", attemptSchema);
module.exports = Attempt;
