const express = require("express");
const Deals = require("../models/DealsSchema");
const router = express.Router();

//* Admin page (secret page) - Verify admin on user in database
// router.get("/", (req, res) => {
//   res.send({ users: "individual" });
// });

//
router.get("/", async (req, res) => {
  try {
    const pendingDeals = await Deals.find({
      submittedStatus: "pending",
    }).populate("category");
    res.status(201).send(pendingDeals);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updateStatus = async () => {
      if (status === "Approve") {
        const updateApprove = await Deals.findByIdAndUpdate(
          id,
          { submittedStatus: "Approve" },
          { new: true }
        );
        return res.status(201).send(updateApprove);
      }
      if (status === "Reject") {
        const updateReject = await Deals.findByIdAndUpdate(
          id,
          { submittedStatus: "Reject" },
          { new: true }
        );
        return res.status(201).send(updateReject);
      }
    };
    updateStatus();
  } catch (error) {
    res.status(500).send({ error });
  }
});
module.exports = router;
