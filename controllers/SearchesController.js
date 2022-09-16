const express = require("express");
const router = express.Router();

//* Search for deals by name (query?)
//? No auth req
router.get("/:id", (req, res) => {
  res.send({ deals: "individual" });
});
module.exports = router;
