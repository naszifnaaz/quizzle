const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  id: String,
  text: String,
});

const questionSchema = new mongoose.Schema({
  text: String,
  options: [optionSchema],
  correctAnswers: [String],
  multipleCorrect: {
    type: Boolean,
    default: false,
  },
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: { type: String },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [questionSchema],
    timeLimit: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    attempts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attempt",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
