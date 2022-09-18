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
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updateWatchList = await User.findByIdAndUpdate(id, body, {
      new: true,
    });
    const check = () => {
      if (body.watchList) {
        return res.status(201).send(updateWatchList);
      }
    };
    check();
  } catch (error) {
    res.status(400).send({ error });
  }
});
module.exports = router;
