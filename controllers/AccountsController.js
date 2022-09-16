const express = require("express");
const router = express.Router();

//* Show personal account details
//? No auth req (might not need an express route then?)
router.get("/", (req, res) => {
  res.send({ users: "individual" });
});

//* Change account password (or other details maybe?) by id
router.put("/:id", (req, res) => {
  res.send({ users: "individual" });
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
