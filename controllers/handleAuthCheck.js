const express = require("express");
const router = express.Router();
import authCheck from "../component/authCheck";

//* /authcheck call
router.get("/", authCheck, async (req, res) => {
  const userName = req.body.userName;
  const foundUser = await User.findOne({ userName: userName }).exec();
  const userData = {
    userName: foundUser.userName,
    submissions: foundUser.submissions,
    roles: foundUser.roles,
    likes: foundUser.likes,
    email: foundUser.email,
    dateOfBirth: foundUser.dateOfBirth,
    avatar: foundUser.avatar,
    infringement: foundUser.infringement,
    watchList: foundUser.watchList,
  };

  res.status(200).json({ status: 200, payload: { user: userData } });
});

module.exports = router;
