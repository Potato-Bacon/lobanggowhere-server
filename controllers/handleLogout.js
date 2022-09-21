const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const authCheck = require("../component/authCheck");

router.post("/", authCheck, async (req, res) => {
  console.log("Running logout sequence")
  const userName = req.body.user.userName;
  const foundUser = await User.findOne({ userName: userName }).exec();

  foundUser.refreshToken = "";
  res.status(200).send({ status: 200, payload: "Success" });
  // res.clearCookie("jwt", { path: "/" });
});

module.exports = router;
