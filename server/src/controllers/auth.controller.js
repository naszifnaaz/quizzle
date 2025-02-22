const { generateToken } = require("../helpers/jwt-handler");
const User = require("../models/user.model");

// post : register user
// name, email, password
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).send({ message: "Invalid credentials" });

    // Check if user is already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "User already registered" });
    }

    // If user does not exist, register user
    user = await User.create(req.body);
    const token = generateToken(user._id);
    return res.status(200).send({
      message: "User registered!",
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// post : login user
// email, password
exports.login = async (req, res) => {
  try {
    // check if email exist
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // if email exists, check password
    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // if password matches, generate token
    const token = generateToken(user);
    return res.status(200).send({
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
