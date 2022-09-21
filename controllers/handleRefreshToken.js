const User = require("../models/UserSchema");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res
      .status(401)
      .send({ status: 401, payload: "Refresh token missing" });
  const refreshToken = cookies.jwt;
  console.log(`Refresh token returned: ${refreshToken}`);

  const foundUser = await User.findOne({ refreshToken }).exec();
  //Forbidden
  if (!foundUser)
    return res
      .status(403)
      .send({ status: 403, payload: "Missing username verification" });
  console.log(foundUser);

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.userName !== decoded.userName) {
      console.log("Wrong user detected from token");
      console.log(
        `Found user: ${foundUser.userName} and decoded user: ${decoded.userName}`
      );
      return res
        .status(403)
        .send({ status: 403, payload: "Access token does not match user" });
    }
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
    // const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userName: decoded.userName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    res
      .status(200)
      .send({ status: 200, payload: { accessToken, user: userData } });
  });
});
module.exports = router;
