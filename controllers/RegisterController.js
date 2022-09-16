const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();

//*  Register User
//? No Auth required - Remember to not copy entire object!
router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const { userName } = newUser;
    const result = await User.find({ userName });
    console.log(userName);
    if (result.length > 0) {
      res.status(500).send({ msg: "Please choose a unique username" });
    } else {
      User.create(newUser, (error, user) => {
        res.status(201).send(user);
      });
    }
  } catch (error) {
    res.send({ msg: error });
  }
});

module.exports = router;
