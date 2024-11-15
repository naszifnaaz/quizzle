const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});
