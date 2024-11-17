// Mongo Atlas integration with mongoose ORM

const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log("Database connection successful.");
  } catch (error) {
    console.log("Database connection failed. see logs below");
    console.log(error);
  }
};

module.exports = connect;
