// express server config
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const helmet = require("helmet");
const connect = require("./src/configs/db");
app.use(helmet());
const { clerkMiddleware } = require("@clerk/express");
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Quizzle Express Backend!");
});

const webhookRoutes = require("./src/routes/webhook.router");
const quizRoutes = require("./src/routes/quiz.router");

app.use("/webhooks", webhookRoutes);
app.use("/api/quizzes", quizRoutes);

app.listen(8080, () => {
  console.log("Listening on port 8080...");
  connect();
});
