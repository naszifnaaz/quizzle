const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.contoller");
const authController = require("../controllers/auth.controller");
const { authenticateUser } = require("../helpers/jwt-handler");

//auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticateUser, authController.getCurrentUser);

router.get("/my-quizzes", authenticateUser, userController.getMyQuizzes);
router.get("/my-attempts", authenticateUser, userController.getMyAttempts);
router.get("/available", authenticateUser, userController.getAvailableQuizzes);

module.exports = router;
