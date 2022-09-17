const express = require("express");
const Deals = require("../models/DealsSchema");
const router = express.Router();

//* Search for deals by id
//? No auth req
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const deal = await Deals.findById(id).populate("category");
  console.log(typeof id);
  res.send(deal);
});

//* User edit post by id (verify user is owner)
router.put("/:id", (req, res) => {
  res.send({ users: "individual" });
});
module.exports = router;
