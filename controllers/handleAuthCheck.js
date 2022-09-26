const express = require("express");
const router = express.Router();
const authCheck = require("../component/authCheck");
// const User = require("../models/UserSchema");

//* /authcheck call
router.post("/", authCheck, async (req, res) => {
  // const userName = req.body.userName;
  // const foundUser = await User.findOne({ userName: userName }).exec();
  const userData = {
    userName: req.body.user.userName,
    submissions: req.body.user.submissions,
    roles: req.body.user.roles,
    likes: req.body.user.likes,
    email: req.body.user.email,
    dateOfBirth: req.body.user.dateOfBirth,
    avatar: req.body.user.avatar,
    infringement: req.body.user.infringement,
    watchList: req.body.user.watchList,
  };

  res.status(200).json({ status: 200, payload: { user: userData } });
});

module.exports = router;
