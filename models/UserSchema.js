const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    submissions: [String],
    likes: [String],
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    avatar: { type: [String], default: "0" },
    infringement: { type: Number, default: 0 },
    roles: { type: [String], default: ["User"] }, //* Replacing admin boolean, with string array of roles (eg: 'User', 'Admin')
    watchList: [String],
    refreshToken: { type: String },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
