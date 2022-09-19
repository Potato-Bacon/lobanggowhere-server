const express = require("express");
const Deals = require("../models/DealsSchema");
const User = require("../models/UserSchema");
const router = express.Router();

//* Search for deals by id
//? No auth req
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const deal = await Deals.findById(id).populate("category");
  res.status(201).send(deal);
});

//* User edit post by id (verify user is owner)
//watchList
router.put("/addtowatchlist/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const addToWatchList = await User.findOneAndUpdate(
      { userName: id },
      { $addToSet: { watchList: body } },
      {
        new: true,
      }
    );
    res.status(201).send(addToWatchList);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.put("/removefromwatchlist/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body, "body");
  console.log(typeof id, "id");

  try {
    const removeToWatchList = await User.findOneAndUpdate(
      { userName: id },
      { $pull: { watchList: { $in: body } } }
    );
    console.log("remove", removeToWatchList);
    res.status(201).send(removeToWatchList);
  } catch (error) {
    res.status(400).send({ error });
  }
});
module.exports = router;
