const Quiz = require("../models/quiz.model");
const User = require("../models/user.model");
const Attempt = require("../models/attempt.model");

// Save quiz as draft
exports.draftQuiz = async (req, res) => {
  try {
    const { title, desc, questions, timeLimit } = req.body;
    const user = await User.findById(req.auth._id);

    const quiz = new Quiz({
      title: title || "",
      desc: desc || "",
      creator: user._id,
      questions: questions || [],
      timeLimit: timeLimit || 10,
      status: "Draft",
    });

    await quiz.save();

    // Add quiz to user's created quizzes
    await User.findByIdAndUpdate(user._id, {
      $push: { created: quiz._id },
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Publish quiz and generate unique link
exports.publishQuiz = async (req, res) => {
  try {
    const { title, desc, questions, timeLimit } = req.body;
    const user = await User.findById(req.auth._id);

    const quiz = new Quiz({
      title,
      desc,
      creator: user._id,
      questions,
      timeLimit,
      status: "Published",
    });

    await quiz.save();

    // Add quiz to user's created quizzes
    await User.findByIdAndUpdate(user._id, {
      $push: { created: quiz._id },
    });

    // Generate unique URL
    const quizURL = `https://quizzle.com/quiz/${quiz._id}`;

    res.status(201).json({ quizURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit a quiz attempt
exports.submitQuiz = async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;
    const quizId = req.params.id;
    const user = await User.findById(req.auth._id);

    const quiz = await Quiz.findById(quizId);

    // Calculate score
    let score = 0;
    const processedAnswers = answers.map((answer) => {
      const question = quiz.questions.find(
        (q) => q._id.toString() === answer.questionId
      );
      const isCorrect =
        JSON.stringify(answer.selectedOptions.sort()) ===
        JSON.stringify(question.correctAnswers.sort());
      if (isCorrect) score++;

      return {
        question: question.text,
        userAnswer: answer.selectedOptions,
        correctAnswer: question.correctAnswers,
        isCorrect,
      };
    });

    const attempt = new Attempt({
      user: user._id,
      quiz: quizId,
      score,
      timeTaken,
      answers: processedAnswers,
    });

    await attempt.save();

    // Add attempt to user's attempted quizzes
    await User.findByIdAndUpdate(user._id, {
      $push: { attemptedQuizzes: attempt._id },
    });

    // Increment participants count
    await Quiz.findByIdAndUpdate(quizId, {
      $inc: { participants: 1 },
    });

    res.status(200).json(attempt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get quiz details by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("creator", "name");
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json({ currentQuiz: quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get quiz results after submission
exports.getQuizResults = async (req, res) => {
  try {
    const attempt = await Attempt.findOne({
      quiz: req.params.id,
      user: (await User.findOne({ email: req.auth.email }))._id,
    });
    if (!attempt) {
      return res.status(404).json({ error: "Results not found" });
    }
    res.status(200).json(attempt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, questions, timeLimit, status } = req.body;

    // Update quiz in the database
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, questions, timeLimit, status },
      { new: true, runValidators: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json({
      message: "Quiz updated",
      updatedQuiz,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
