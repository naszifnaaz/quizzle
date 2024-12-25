const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.contoller");
const { requireAuth } = require("@clerk/express");

router.get("/my-quizzes", requireAuth(), userController.getMyQuizzes);
router.get("/my-attempts", requireAuth(), userController.getMyAttempts);
router.get("/available", requireAuth(), userController.getAvailableQuizzes);

module.exports = router;
