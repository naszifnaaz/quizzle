const mongoose = require("mongoose");
const User = require("../models/user.model");
const Quiz = require("../models/quiz.model");
const Attempt = require("../models/attempt.model");
require("dotenv").config();

const MONGODB_URI = process.env.MONGO_CONNECTION_URI;

const usersData = [
  {
    clerkId: "user_2pvOEdho2ilYcSQlZ88SKe0cNs1",
    email: "alice.smith@example.com",
    name: "Alice Smith",
  },
  {
    clerkId: "user_2pvOM9bJINllE6CXdtjuMmWqNF7",
    email: "bob.jones@example.com",
    name: "Bob Jones",
  },
  {
    clerkId: "user_2pvOIwrM0kv3TPyOinpiR9NLpeY",
    email: "carol.white@example.com",
    name: "Carol White",
  },
  {
    clerkId: "user_2pvOR1CgA1qBJg799P8IJ2ahoYS",
    email: "daniel.brown@example.com",
    name: "Daniel Brown",
  },
  {
    clerkId: "user_2pvOTSXIsfxoYviEyP0MwOpIZCY",
    email: "ella.green@example.com",
    name: "Ella Green",
  },
  {
    clerkId: "user_2pvOWe75WGuvXJtgR50bpYVu1K4",
    email: "frank.martin@example.com",
    name: "Frank Martin",
  },
  {
    clerkId: "user_2pvOZ8NYJ0UtVUNtQvBp2mXG2kR",
    email: "george.taylor@example.com",
    name: "George Taylor",
  },
  {
    clerkId: "user_2pvObwog8M64ZBOdwcVWAX4Z4eJ",
    email: "hannah.clark@example.com",
    name: "Hannah Clark",
  },
  {
    clerkId: "user_2pvOqayhenud2jy08tvxrkUFrN1",
    email: "ian.lopez@example.com",
    name: "Ian Lopez",
  },
  {
    clerkId: "user_2pvOsoNDFwMXtdAlp56mZSrNVal",
    email: "julia.williams@example.com",
    name: "Julia Williams",
  },
];

const quizzesData = [
  {
    title: "General Knowledge",
    creator: null,
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
    ],
    timeLimit: 60,
    status: "Published",
  },
  {
    title: "Math Quiz",
    creator: null,
    questions: [
      {
        text: "What is 5 + 3?",
        options: [
          { id: "1", text: "6" },
          { id: "2", text: "7" },
          { id: "3", text: "8" },
        ],
        correctAnswers: ["3"],
        multipleCorrect: false,
      },
    ],
    timeLimit: 45,
    status: "Published",
  },
  {
    title: "Science Quiz",
    creator: null,
    questions: [
      {
        text: "What is the chemical symbol for water?",
        options: [
          { id: "1", text: "H2O" },
          { id: "2", text: "CO2" },
          { id: "3", text: "O2" },
        ],
        correctAnswers: ["1"],
        multipleCorrect: false,
      },
    ],
    timeLimit: 30,
    status: "Published",
  },
  {
    title: "Geography",
    creator: null,
    questions: [
      {
        text: "Which country is Paris in?",
        options: [
          { id: "1", text: "Germany" },
          { id: "2", text: "France" },
          { id: "3", text: "Italy" },
        ],
        correctAnswers: ["2"],
        multipleCorrect: false,
      },
    ],
    timeLimit: 45,
    status: "Draft",
  },
  {
    title: "History",
    creator: null,
    questions: [
      {
        text: "Who was the first president of the United States?",
        options: [
          { id: "1", text: "Abraham Lincoln" },
          { id: "2", text: "George Washington" },
          { id: "3", text: "Thomas Jefferson" },
        ],
        correctAnswers: ["2"],
        multipleCorrect: false,
      },
    ],
    timeLimit: 60,
    status: "Published",
  },
  {
    title: "Art",
    creator: null,
    questions: [
      {
        text: "Who painted the Mona Lisa?",
        options: [
          { id: "1", text: "Leonardo da Vinci" },
          { id: "2", text: "Vincent van Gogh" },
          { id: "3", text: "Pablo Picasso" },
        ],
        correctAnswers: ["1"],
        multipleCorrect: false,
      },
    ],
    timeLimit: 30,
    status: "Draft",
  },
  {
    title: "Physics",
    creator: null,
    questions: [
      {
        text: "What is the speed of light?",
        options: [
          { id: "1", text: "299,792,458 m/s" },
          { id: "2", text: "300,000,000 m/s" },
          { id: "3", text: "150,000,000 m/s" },
        ],
        correctAnswers: ["1"],
        multipleCorrect: false,
      },
    ],
    timeLimit: 60,
    status: "Published",
  },
  {
    title: "Literature",
    creator: null,
    questions: [
      {
        text: 'Who wrote "1984"?',
        options: [
          { id: "1", text: "George Orwell" },
          { id: "2", text: "Aldous Huxley" },
          { id: "3", text: "J.K. Rowling" },
        ],
        correctAnswers: ["1"],
        multipleCorrect: false,
      },
    ],
    timeLimit: 45,
    status: "Published",
  },
  {
    title: "Music",
    creator: null,
    questions: [
      {
        text: "Who composed the Four Seasons?",
        options: [
          { id: "1", text: "Beethoven" },
          { id: "2", text: "Mozart" },
          { id: "3", text: "Vivaldi" },
        ],
        correctAnswers: ["3"],
        multipleCorrect: false,
      },
    ],
    timeLimit: 30,
    status: "Draft",
  },
  {
    title: "Computer Science",
    creator: null,
    questions: [
      {
        text: "What is the main function of a CPU?",
        options: [
          { id: "1", text: "Perform calculations" },
          { id: "2", text: "Store data" },
          { id: "3", text: "Send network signals" },
        ],
        correctAnswers: ["1"],
        multipleCorrect: false,
      },
    ],
    timeLimit: 50,
    status: "Published",
  },
];

const attemptsData = [
  {
    user: null,
    quiz: null,
    score: 1,
    timeTaken: 60,
    answers: [
      {
        question: "What is the capital of France?",
        userAnswer: ["Paris"],
        correctAnswer: ["Paris"],
        isCorrect: true,
      },
    ],
  },
  {
    user: null,
    quiz: null,
    score: 1,
    timeTaken: 45,
    answers: [
      {
        question: "What is 5 + 3?",
        userAnswer: ["8"],
        correctAnswer: ["8"],
        isCorrect: true,
      },
    ],
  },
  {
    user: null,
    quiz: null,
    score: 0,
    timeTaken: 30,
    answers: [
      {
        question: "What is the chemical symbol for water?",
        userAnswer: ["CO2"],
        correctAnswer: ["H2O"],
        isCorrect: false,
      },
    ],
  },
  {
    user: null,
    quiz: null,
    score: 1,
    timeTaken: 45,
    answers: [
      {
        question: "Which country is Paris in?",
        userAnswer: ["France"],
        correctAnswer: ["France"],
        isCorrect: true,
      },
    ],
  },
  {
    user: null,
    quiz: null,
    score: 1,
    timeTaken: 60,
    answers: [
      {
        question: "Who was the first president of the United States?",
        userAnswer: ["George Washington"],
        correctAnswer: ["George Washington"],
        isCorrect: true,
      },
    ],
  },
  {
    user: null,
    quiz: null,
    score: 1,
    timeTaken: 30,
    answers: [
      {
        question: "Who painted the Mona Lisa?",
        userAnswer: ["Leonardo da Vinci"],
        correctAnswer: ["Leonardo da Vinci"],
        isCorrect: true,
      },
    ],
  },
  {
    user: null,
    quiz: null,
    score: 1,
    timeTaken: 60,
    answers: [
      {
        question: "What is the speed of light?",
        userAnswer: ["299,792,458 m/s"],
        correctAnswer: ["299,792,458 m/s"],
        isCorrect: true,
      },
    ],
  },
  {
    user: null,
    quiz: null,
    score: 1,
    timeTaken: 45,
    answers: [
      {
        question: 'Who wrote "1984"?',
        userAnswer: ["George Orwell"],
        correctAnswer: ["George Orwell"],
        isCorrect: true,
      },
    ],
  },
  {
    user: null,
    quiz: null,
    score: 1,
    timeTaken: 30,
    answers: [
      {
        question: "Who composed the Four Seasons?",
        userAnswer: ["Vivaldi"],
        correctAnswer: ["Vivaldi"],
        isCorrect: true,
      },
    ],
  },
  {
    user: null,
    quiz: null,
    score: 1,
    timeTaken: 50,
    answers: [
      {
        question: "What is the main function of a CPU?",
        userAnswer: ["Perform calculations"],
        correctAnswer: ["Perform calculations"],
        isCorrect: true,
      },
    ],
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Delete existing data (optional)
    await User.deleteMany({});
    await Quiz.deleteMany({});
    await Attempt.deleteMany({});

    // Create Users
    const createdUsers = await User.insertMany(usersData);
    console.log("Users created:", createdUsers);

    // Set creator reference in quizzes
    quizzesData[0].creator = createdUsers[0]._id; // User 1 created the first quiz
    quizzesData[1].creator = createdUsers[1]._id; // User 2 created the second quiz
    quizzesData[2].creator = createdUsers[2]._id; // User 3 created the third quiz
    quizzesData[3].creator = createdUsers[3]._id; // User 4 created the fourth quiz
    quizzesData[4].creator = createdUsers[4]._id; // User 5 created the fifth quiz
    quizzesData[5].creator = createdUsers[5]._id; // User 6 created the sixth quiz
    quizzesData[6].creator = createdUsers[6]._id; // User 7 created the seventh quiz
    quizzesData[7].creator = createdUsers[7]._id; // User 8 created the eighth quiz
    quizzesData[8].creator = createdUsers[8]._id; // User 9 created the ninth quiz
    quizzesData[9].creator = createdUsers[9]._id; // User 10 created the tenth quiz

    // Create Quizzes
    const createdQuizzes = await Quiz.insertMany(quizzesData);
    console.log("Quizzes created:", createdQuizzes);

    // Set quiz reference in attempts
    attemptsData[0].user = createdUsers[0]._id;
    attemptsData[0].quiz = createdQuizzes[0]._id;
    attemptsData[1].user = createdUsers[1]._id;
    attemptsData[1].quiz = createdQuizzes[1]._id;
    attemptsData[2].user = createdUsers[2]._id;
    attemptsData[2].quiz = createdQuizzes[2]._id;
    attemptsData[3].user = createdUsers[3]._id;
    attemptsData[3].quiz = createdQuizzes[3]._id;
    attemptsData[4].user = createdUsers[4]._id;
    attemptsData[4].quiz = createdQuizzes[4]._id;
    attemptsData[5].user = createdUsers[5]._id;
    attemptsData[5].quiz = createdQuizzes[5]._id;
    attemptsData[6].user = createdUsers[6]._id;
    attemptsData[6].quiz = createdQuizzes[6]._id;
    attemptsData[7].user = createdUsers[7]._id;
    attemptsData[7].quiz = createdQuizzes[7]._id;
    attemptsData[8].user = createdUsers[8]._id;
    attemptsData[8].quiz = createdQuizzes[8]._id;
    attemptsData[9].user = createdUsers[9]._id;
    attemptsData[9].quiz = createdQuizzes[9]._id;

    // Create Attempts
    const createdAttempts = await Attempt.insertMany(attemptsData);
    console.log("Attempts created:", createdAttempts);

    // Update users with created quizzes and attempted quizzes
    for (let i = 0; i < createdUsers.length; i++) {
      await User.updateOne(
        { clerkId: createdUsers[i].clerkId },
        {
          $push: {
            createdQuizzes: createdQuizzes[i]._id,
            attemptedQuizzes: createdAttempts[i]._id,
          },
        }
      );
    }

    console.log("Database seeding completed!");
    mongoose.connection.close(); // Close connection
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Run the seed function
seedDatabase();
