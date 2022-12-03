const Bidding = require("../models/Bidding");
const CurrentJob = require("../models/CurrentJob");
const Report = require("../models/ReportModel");

const router = require("express").Router();

//post a bidding in report model Info using issue query

router.put("/:jobid", async (req, res) => {
  const newBidding = new Bidding(req.body);
  const jobid = req.params.jobid;
  try {
    const savedBidding = await newBidding.save();
    await Report.findByIdAndUpdate(jobid, {
      $push: { contracBiddingInfo: newBidding._id },
    });
    await CurrentJob.findByIdAndUpdate(
      jobid,
      {
        $set: { postBidding: true },
      },

      { new: true }
    );

    await CurrentJob.findByIdAndUpdate(
      jobid,
      {
        $push: { contractorBiddingEmail: newBidding.contractorEmail },
      },

      { new: true }
    );

    await CurrentJob.findByIdAndUpdate(jobid, {
      $push: { appliedJobs: newBidding._id },
    });
    res.status(200).json(savedBidding);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const biddingId = req.params.id;
  try {
    const singleBidding = await Bidding.findById(biddingId);
    res.status(200).json(singleBidding);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
