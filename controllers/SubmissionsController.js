const express = require("express");
const Deals = require("../models/DealsSchema");
const router = express.Router();

//* Add a deal
router.post("/", (req, res) => {
  const newSubmission = req.body;
  console.log("newSubmission", newSubmission);
  Deals.create(newSubmission, (error, submission) => {
    if (error) {
      res.status(500).send({ error });
    } else {
      res.status(201).send(submission);
    }
  });
});
module.exports = router;
