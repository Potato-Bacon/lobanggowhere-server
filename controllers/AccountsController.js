const express = require("express");
const User = require("../models/UserSchema");
const Deals = require("../models/DealsSchema");
const bcrypt = require("bcrypt");

const router = express.Router();

//* Show personal account details
//? No auth req (might not need an express route then?)

//* Verify if current password is same as password in db
router.post("/verify", async (req, res) => {
  const { userName, password } = req.body;
  const foundUser = await User.findOne({ userName: userName }).exec();
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    res.status(200).send({ msg: "verified" });
  } else {
    res.status(401).send({ msg: "wrong password" });
  }
});
//* Change account password (or other details maybe?) by id
router.put("/changepassword", async (req, res) => {
  const { userName, newPassword } = req.body;
  const updatePassword = await User.findOneAndUpdate(
    {
      userName: userName,
    },
    { password: bcrypt.hashSync(newPassword, 10) }
  ).exec();
  res.status(200).send(updatePassword);
});

//
router.put("/deals", async (req, res) => {
  const { userName, dealsID } = req.body;
  const updateUserDeals = await User.findOneAndUpdate(
    { userName: userName },
    { $addToSet: { submissions: dealsID } },
    { new: true }
  ).exec();
  res.status(200).send(updateUserDeals);
});

//retrieve user submissions
router.post("/submitteddeals", async (req, res) => {
  const submissions = req.body;
  const userSubmittedDeals = await Deals.find({ _id: { $in: submissions } });
  res.status(200).send(userSubmittedDeals);
});

//
//retrieve user submissions
router.post("/watchlist", async (req, res) => {
  const watchList = req.body;
  const userWatchList = await Deals.find({ _id: { $in: watchList } });
  res.status(200).send(userWatchList);
});

//* Delete account by id
router.delete("/:id", (req, res) => {
  res.send({ users: "individual" });
});

//* Search for user by id
//? No auth req
router.get("/:id", (req, res) => {
  res.send({ users: "individual" });
});

module.exports = router;
