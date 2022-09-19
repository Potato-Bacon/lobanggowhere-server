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
      .json({ message: "Username and password are required." });
  const foundUser = await User.findOne({ userName: userName }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //* Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // const roles = Object.values(foundUser.roles).filter(Boolean);
    const roles = foundUser.roles;
    //* Create JWTs
    const accessToken = jwt.sign(
      {
        //* Not sending password to be stored client-side, for security reasons
        user: {
          userName: foundUser.userName,
          submissions: foundUser.submissions,
          roles: roles,
          likes: foundUser.likes,
          email: foundUser.email,
          dateOfBirth: foundUser.dateOfBirth,
          avatar: foundUser.avatar,
          infringement: foundUser.infringement,
          watchList: foundUser.watchList,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //* Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    console.log(roles);

    //* Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //* Send authorization roles and access token to user
    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
