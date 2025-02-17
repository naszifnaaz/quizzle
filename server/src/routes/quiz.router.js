const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");
const { requireAuth } = require("@clerk/express");

// Quiz routes
router.post("/draft", requireAuth(), quizController.draftQuiz);
router.post("/publish", requireAuth(), quizController.publishQuiz);
router.get("/my-quizzes", requireAuth(), quizController.getMyQuizzes);
router.get("/my-attempts", requireAuth(), quizController.getMyAttempts);
router.get("/available", requireAuth(), quizController.getAvailableQuizzes);
router.put("/:id", requireAuth(), quizController.updateQuiz);
router.get("/:id", quizController.getQuizById);
router.post("/:id/submit", requireAuth(), quizController.submitQuiz);
router.get("/:id/results", requireAuth(), quizController.getQuizResults);

module.exports = router;
