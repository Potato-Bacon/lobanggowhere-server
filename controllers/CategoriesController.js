const express = require("express");
const Category = require("../models/CategorySchema");
const router = express.Router();

//* Search for deals by search category
//? No auth req
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = router;
