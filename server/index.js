// express server config

const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const helmet = require("helmet");
const connect = require("./src/configs/db");
app.use(helmet());

app.listen(8080, () => {
  console.log("Listening on port 8080...");
  connect();
});
