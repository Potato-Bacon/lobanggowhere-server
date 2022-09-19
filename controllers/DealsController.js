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
//watchList find user and add deal to watchList
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

//watchList find user and remove deal to watchList
router.put("/removefromwatchlist/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const removeFromWatchList = await User.findOneAndUpdate(
      { userName: id },
      { $pull: { watchList: { $in: body } } }
    );
    res.status(201).send(removeFromWatchList);
  } catch (error) {
    res.status(400).send({ error });
  }
});

//add like
router.put("/addlike/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const addLike = await User.findByIdAndUpdate(
      id,
      { $addToSet: { likes: body } },
      {
        new: true,
      }
    );
    res.status(201).send(addLike);
  } catch (error) {
    res.status(400).send({ error });
  }
});

//remove like
router.put("/removelike/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const removeLike = await User.findOneAndUpdate(
      { userName: id },
      { $pull: { watchList: { $in: body } } }
    );
    res.status(201).send(removeLike);
  } catch (error) {
    res.status(400).send({ error });
  }
});
module.exports = router;
