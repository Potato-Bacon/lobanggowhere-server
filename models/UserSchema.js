const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    submissionEvent: [String],
    submissionDeal: [String],
    likes: [String],
    emailAddress: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    avatar: { type: Number, default: 0 },
    infringement: { type: Number, default: 0 },
    admin: { type: Boolean, required: true },
    watchList: [String],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;