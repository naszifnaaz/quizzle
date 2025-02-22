const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");
const { authenticateUser } = require("../helpers/jwt-handler");

// Quiz routes
router.post("/draft", quizController.draftQuiz);
router.post("/publish", authenticateUser, quizController.publishQuiz);
router.put("/:id", authenticateUser, quizController.updateQuiz);
router.get("/:id", quizController.getQuizById);
router.post("/:id/submit", authenticateUser, quizController.submitQuiz);
router.get("/:id/results", authenticateUser, quizController.getQuizResults);

module.exports = router;
