const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    avatar: { type: String },
    created: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        default: [],
      },
    ],
    attempted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attempt",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  // hash the plain text password before storing in db
  const hash = bcrypt.hashSync(this.password);
  this.password = hash;

  // generate initial based avatar using dicebear API
  const encodedName = encodeURIComponent(this.name.trim());
  this.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}`;

  next();
});

// function to compare hashed password with plain text password
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
