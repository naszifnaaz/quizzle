export const createdQuizzes = [
  {
    id: 1,
    title: "JavaScript Basics",
    questions: 10,
    participants: 150,
    status: "Published",
    timeLimit: 20,
  },
  {
    id: 2,
    title: "React Fundamentals",
    questions: 15,
    participants: 75,
    status: "Published",
    timeLimit: 30,
  },
  {
    id: 3,
    title: "CSS Tricks",
    questions: 8,
    participants: 0,
    status: "Draft",
    timeLimit: 15,
  },
  {
    id: 4,
    title: "Python for Beginners",
    questions: 12,
    participants: 200,
    status: "Published",
    timeLimit: 25,
  },
  {
    id: 5,
    title: "Data Structures",
    questions: 20,
    participants: 50,
    status: "Published",
    timeLimit: 40,
  },
  {
    id: 6,
    title: "Machine Learning Intro",
    questions: 5,
    participants: 0,
    status: "Draft",
    timeLimit: 10,
  },
];

export const participatedQuizzes = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    questions: 20,
    participants: 300,
    status: "Completed",
    timeLimit: 40,
    score: 85,
    timeTaken: 35,
    completedDate: "2023-06-15",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    questions: 25,
    participants: 150,
    status: "Completed",
    timeLimit: 50,
    score: 92,
    timeTaken: 45,
    completedDate: "2023-06-20",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    questions: 15,
    participants: 200,
    status: "Completed",
    timeLimit: 30,
    score: 78,
    timeTaken: 28,
    completedDate: "2023-06-25",
  },
];

export const availableQuizzes = [
  {
    id: 1,
    title: "Introduction to AI",
    questions: 15,
    participants: 500,
    status: "Available",
    timeLimit: 30,
  },
  {
    id: 2,
    title: "Blockchain Basics",
    questions: 12,
    participants: 300,
    status: "Available",
    timeLimit: 25,
  },
  {
    id: 3,
    title: "Cloud Computing Fundamentals",
    questions: 18,
    participants: 400,
    status: "Available",
    timeLimit: 35,
  },
  {
    id: 4,
    title: "Cybersecurity Essentials",
    questions: 20,
    participants: 600,
    status: "Available",
    timeLimit: 40,
  },
  {
    id: 5,
    title: "Data Science for Beginners",
    questions: 16,
    participants: 450,
    status: "Available",
    timeLimit: 30,
  },
  {
    id: 6,
    title: "Mobile App Development",
    questions: 14,
    participants: 350,
    status: "Available",
    timeLimit: 28,
  },
];

export const mockReport = {
  username: "user1",
  quizTitle: "JavaScript Basics",
  score: 8,
  totalQuestions: 10,
  timeTaken: 15,
  answers: [
    {
      question: "What is JavaScript?",
      userAnswer: "A programming language",
      correctAnswer: "A programming language",
      isCorrect: true,
    },
    {
      question: "What is a variable?",
      userAnswer: "A container for data",
      correctAnswer: "A container for data",
      isCorrect: true,
    },
    {
      question: "What is a function?",
      userAnswer: "A block of code",
      correctAnswer: "A block of code",
      isCorrect: true,
    },
    {
      question: "What is an array?",
      userAnswer: "A list of items",
      correctAnswer: "A list of items",
      isCorrect: true,
    },
    {
      question: "What is an object?",
      userAnswer: "A collection of properties",
      correctAnswer: "A collection of properties",
      isCorrect: true,
    },
    {
      question: "What is a loop?",
      userAnswer: "A way to repeat code",
      correctAnswer: "A way to repeat code",
      isCorrect: true,
    },
    {
      question: "What is a conditional statement?",
      userAnswer: "A way to make decisions",
      correctAnswer: "A way to make decisions",
      isCorrect: true,
    },
    {
      question: "What is the DOM?",
      userAnswer: "Document Object Model",
      correctAnswer: "Document Object Model",
      isCorrect: true,
    },
    {
      question: "What is event handling?",
      userAnswer: "Responding to user actions",
      correctAnswer: "Responding to user interactions",
      isCorrect: false,
    },
    {
      question: "What is AJAX?",
      userAnswer: "Asynchronous JavaScript",
      correctAnswer: "Asynchronous JavaScript and XML",
      isCorrect: false,
    },
  ],
};

export const participants = [
  { username: "user1", score: 8, timeTaken: 15 },
  { username: "user2", score: 7, timeTaken: 18 },
  { username: "user3", score: 10, timeTaken: 12 },
  { username: "user4", score: 6, timeTaken: 20 },
  { username: "user5", score: 9, timeTaken: 14 },
];

export const quizzes = [
  {
    id: 1,
    title: "JavaScript Basics",
    questions: 10,
    participants: 150,
    status: "Published",
    timeLimit: 20,
  },
  {
    id: 2,
    title: "React Fundamentals",
    questions: 15,
    participants: 75,
    status: "Published",
    timeLimit: 30,
  },
  {
    id: 3,
    title: "CSS Tricks",
    questions: 8,
    participants: 0,
    status: "Draft",
    timeLimit: 15,
  },
  {
    id: 4,
    title: "Python for Beginners",
    questions: 12,
    participants: 200,
    status: "Published",
    timeLimit: 25,
  },
  {
    id: 5,
    title: "Data Structures",
    questions: 20,
    participants: 50,
    status: "Published",
    timeLimit: 40,
  },
  {
    id: 6,
    title: "Machine Learning Intro",
    questions: 5,
    participants: 0,
    status: "Draft",
    timeLimit: 10,
  },
];

// Mock quiz data (unchanged)
export const quizData = {
  title: "JavaScript Fundamentals",
  timeLimit: 10, // in minutes
  questions: [
    {
      id: 1,
      text: "Which of the following is/are correct way(s) to declare a variable in JavaScript?",
      options: [
        { id: "a", text: "var x = 5;" },
        { id: "b", text: "let y = 10;" },
        { id: "c", text: "const z = 15;" },
        { id: "d", text: "All of the above" },
      ],
      correctAnswers: ["d"],
      multipleCorrect: false,
    },
    {
      id: 2,
      text: "Which of these are looping structures in JavaScript?",
      options: [
        { id: "a", text: "for" },
        { id: "b", text: "while" },
        { id: "c", text: "do-while" },
        { id: "d", text: "foreach" },
      ],
      correctAnswers: ["a", "b", "c"],
      multipleCorrect: true,
    },
    {
      id: 3,
      text: "What does the 'typeof' operator return for an array?",
      options: [
        { id: "a", text: "array" },
        { id: "b", text: "object" },
        { id: "c", text: "list" },
      ],
      correctAnswers: ["b"],
      multipleCorrect: false,
    },
  ],
};
