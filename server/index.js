const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connect = require("./src/configs/db");
const quizRoutes = require("./src/routes/quiz.router");
const userRoutes = require("./src/routes/user.router");
// const webhookRoutes = require("./src/routes/webhook.router"); clerk dependency

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Quizzle Express Backend!");
});

app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);
// app.use("/webhooks", webhookRoutes); clerk dependency

app.listen(8080, () => {
  console.log("[server] : Listening on port 8080...");
  connect();
});
