const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { clerkMiddleware } = require("@clerk/express");

const connect = require("./src/configs/db");
const webhookRoutes = require("./src/routes/webhook.router");
const quizRoutes = require("./src/routes/quiz.router");
const userRoutes = require("./src/routes/user.router");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Quizzle Express Backend!");
});

app.use("/api/user", userRoutes);
app.use("/webhooks", webhookRoutes);
app.use("/api/quiz", quizRoutes);

app.listen(8080, () => {
  console.log("[server] : Listening on port 8080...");
  connect();
});
