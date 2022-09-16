const express = require("express");
const router = express.Router();

//* Search for deals by id
//? No auth req
router.get("/:id", (req, res) => {
  res.send({ deals: "individual" });
});

//* User edit post by id (verify user is owner)
router.put("/:id", (req, res) => {
  res.send({ users: "individual" });
});
module.exports = router;
