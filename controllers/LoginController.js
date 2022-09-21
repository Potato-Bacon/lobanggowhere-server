const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

//* Temporary User based on similar object in client (or go str8 to mongodb?)
// const user = { userName: "Jake", password: 123 } - need to change it in client side for an actual user too

//* .env file will need ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET - generate with terminal > node (type in terminal) > require('crypto').randomBytes(64).toString('hex')

//* https://developer.mozilla.org/en-US/docs/Glossary/MVC - Model View Controller (data structure I think? Or is it organising of folders)
//* Nodejs: https://www.youtube.com/watch?v=f2EqECiTBL8
//* Clientside: https://www.youtube.com/watch?v=nI8PYZNFtac&t=874s

//* Login - get JWT token & refresh token etc
router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password)
    return res
      .status(400)
      .send({ status: 400, payload: "Username and password are required." });
  const foundUser = await User.findOne({ userName: userName }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //* Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // const roles = Object.values(foundUser.roles).filter(Boolean);
    //* Not sending password to be stored client-side, for security reasons
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
    //* Create JWTs
    const userobj = {
      userName: foundUser.userName,
    };

    const accessToken = jwt.sign(userobj, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "300s",
    });

    const refreshToken = jwt.sign(
      { userName: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //* Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    //* Creates Secure Cookie with refresh token
    res.status(200).cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log(userData);
    console.log(accessToken);
    console.log(refreshToken);
    //* Send authorized user data and access token to user
    res
      .status(200)
      .send({ status: 200, payload: { accessToken, user: userData } });
    // res.json({ text: "Hello" });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
