const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const bcrypt = require("bcrypt");

//*  Register User
//? No Auth required - Remember to not copy entire object!
router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const { userName, email } = newUser;
    const user = await User.find({
      $or: [{ userName: userName }, { email: email }],
    });
    const userNameExist = user.find((x) => x.userName === userName);
    const emailExist = user.find((x) => x.email === email);
    const check = () => {
      if (userNameExist) {
        return res.status(500).send({ msg: "Please use a unique username" });
      }
      if (emailExist) {
        return res.status(500).send({ msg: "Email already in use" });
      }
      if (!userNameExist && !emailExist) {
        const newUserPasswordIsHash = {
          ...newUser,
          password: bcrypt.hashSync(newUser.password, 10),
        };
        User.create(newUserPasswordIsHash, (error, user) => {
          res.status(201).send(user);
        });
      }
    };
    check();
  } catch (error) {
    res.send({ msg: error });
  }
});

module.exports = router;
