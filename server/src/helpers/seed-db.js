const mongoose = require("mongoose");
const User = require("../models/user.model");
const Quiz = require("../models/quiz.model");
const Attempt = require("../models/attempt.model");
require("dotenv").config();

const MONGODB_URI =
  "mongodb+srv://naszifnaaz:aKXSR4RWud3ufRK8@quizzle-cluster.iiyeq.mongodb.net/dev";

const usersData = [
  {
    clerkId: "user_2pvOEdho2ilYcSQlZ88SKe0cNs1",
    email: "alice.smith@example.com",
    name: "Alice Smith",
  },
  {
    clerkId: "user_3pvOEdho2ilYcSQlZ88SKe0cNs2",
    email: "bob.jones@example.com",
    name: "Bob Jones",
  },
  {
    clerkId: "user_4pvOEdho2ilYcSQlZ88SKe0cNs3",
    email: "charlie.brown@example.com",
    name: "Charlie Brown",
  },
];

const quizzesData = [];
const attemptsData = [];

// Generate quizzes and attempts for each user
usersData.forEach((user, userIndex) => {
  // Create 2 quizzes for each user
  for (let i = 0; i < 2; i++) {
    quizzesData.push({
      title: `Quiz ${i + 1} by ${user.name}`,
      desc: `This is quiz ${i + 1} created by ${user.name}.`,
      creator: null, // Will be assigned later
      questions: [
        {
          text: "What is the capital of France?",
          options: [
            { id: "1", text: "Berlin" },
            { id: "2", text: "Madrid" },
            { id: "3", text: "Paris" },
          ],
          correctAnswers: ["3"],
          multipleCorrect: false,
        },
        {
          text: "What is 2 + 2?",
          options: [
            { id: "1", text: "3" },
            { id: "2", text: "4" },
            { id: "3", text: "5" },
          ],
          correctAnswers: ["2"],
          multipleCorrect: false,
        },
      ],
      timeLimit: 60,
      status: "Published",
    });
  }

  // Create 3 quiz attempts for each user
  for (let j = 0; j < 3; j++) {
    attemptsData.push({
      user: null, // Will be assigned later
      quiz: null, // Will be assigned later
      score: 2,
      timeTaken: 45,
      answers: [
        {
          question: "What is the capital of France?",
          userAnswer: ["3"],
          correctAnswer: ["3"],
          isCorrect: true,
        },
        {
          question: "What is 2 + 2?",
          userAnswer: ["2"],
          correctAnswer: ["2"],
          isCorrect: true,
        },
      ],
    });
  }
});

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await Quiz.deleteMany({});
    await Attempt.deleteMany({});

    // Create Users
    const createdUsers = await User.insertMany(usersData);
    console.log("Users created:", createdUsers);

    // Assign creator references to quizzes
    quizzesData.forEach((quiz, index) => {
      quiz.creator = createdUsers[Math.floor(index / 2)]._id; // Ensure 2 quizzes per user
    });

    // Create Quizzes
    const createdQuizzes = await Quiz.insertMany(quizzesData);
    console.log("Quizzes created:", createdQuizzes);

    // Update users with created quizzes
    for (let user of createdUsers) {
      const userQuizzes = createdQuizzes.filter(
        (quiz) => String(quiz.creator) === String(user._id)
      );
      user.created = userQuizzes.map((quiz) => quiz._id);
      await user.save();
    }

    // Prepare and create Attempts
    const attemptDocs = [];
    attemptsData.forEach((attempt, index) => {
      const user = createdUsers[index % createdUsers.length];
      const quiz = createdQuizzes[index % createdQuizzes.length];
      attempt.user = user._id;
      attempt.quiz = quiz._id;

      // Prepare attempt data for bulk insertion
      attemptDocs.push(attempt);
    });

    // Bulk insert attempts
    const createdAttempts = await Attempt.insertMany(attemptDocs);
    console.log("Attempts created:", createdAttempts);

    // Update quizzes with their associated attempts
    for (let attempt of createdAttempts) {
      await Quiz.updateOne(
        { _id: attempt.quiz },
        { $push: { attempts: attempt._id } }
      );
    }

    // Update users with participated attempts
    for (let user of createdUsers) {
      const userAttempts = createdAttempts.filter(
        (attempt) => String(attempt.user) === String(user._id)
      );
      user.attempted = userAttempts.map((attempt) => attempt._id);
      await user.save();
    }

    console.log("Database seeding completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
