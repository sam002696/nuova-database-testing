const Bidding = require("../models/Bidding");
const CurrentJob = require("../models/CurrentJob");
const ReportModel = require("../models/ReportModel");

const router = require("express").Router();

//create a maintenance report

router.post("/", async (req, res) => {
  const date = new Date();
  const newReport = new ReportModel(req.body);
  try {
    const savedReport = await newReport.save();

    // Task 1 start
    await ReportModel.findByIdAndUpdate(
      savedReport._id,
      {
        $set: { "Timeline.taskOne.createdAt": date },
      },
      {
        new: true,
      }
    );
    await ReportModel.findByIdAndUpdate(
      savedReport._id,
      {
        $set: { "Timeline.taskOne.maintenanceReq": true },
      },
      {
        new: true,
      }
    );
    // Task 1 end

    res.status(200).json(savedReport);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all reports

router.get("/", async (req, res) => {
  const email = req.query.email;
  const contractorName = req.query.name;
  try {
    if (email) {
      const reports = await ReportModel.find({ email: email })
        .populate("contracBiddingInfo")
        .populate("assignedContractor");
      res.status(200).json(reports);
    } else if (contractorName) {
      const reports = await ReportModel.findOne({
        assignedContractorName: contractorName,
      })
        .populate("contracBiddingInfo")
        .populate("assignedContractor");
      res.status(200).json(reports);
    } else {
      const reports = await ReportModel.find()
        .populate("contracBiddingInfo")
        .populate("assignedContractor");
      res.status(200).json(reports);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a single report

router.get("/:id", async (req, res) => {
  try {
    const reports = await ReportModel.findById(req.params.id).populate(
      "contracBiddingInfo"
    );
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/singlereport", async (req, res) => {
  const newAssignedContrac = new Bidding(req.body);
  const contractorId = req.query.issue;
  try {
    const savedNewAssignedContrac = await newAssignedContrac.save();
    await ReportModel.findOneAndUpdate(
      contractorId,
      {
        $set: { assignedContractor: savedNewAssignedContrac._id },
      },
      {
        new: true,
      }
    );
    await ReportModel.findOneAndUpdate(
      contractorId,
      {
        $set: { assignedContractorName: savedNewAssignedContrac.name },
      },
      {
        new: true,
      }
    );
    res.status(200).json(savedNewAssignedContrac);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:reportid", async (req, res) => {
  const reportid = req.params.reportid;
  try {
    await ReportModel.findByIdAndUpdate(reportid, {
      $set: req.body,
      new: true,
      upsert: true,
    });
    res.status(200).json("Data has been saved!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// api's based on actions

// accept the offer

router.put("/acceptoffer/:reportid/:biddingid", async (req, res) => {
  const date = new Date();
  const reportid = req.params.reportid;
  const biddingid = req.params.biddingid;
  try {
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { assignedContractor: biddingid },
      },
      {
        new: true,
      }
    );

    // Task 3 start
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { "Timeline.taskThree.createdAt": date },
      },
      {
        new: true,
      }
    );
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { "Timeline.taskThree.assignJob": true },
      },
      {
        new: true,
      }
    );
    // Task 3 end

    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { taskIncomplete: false },
      },
      {
        new: true,
      }
    );

    await Bidding.findByIdAndUpdate(
      biddingid,
      {
        $set: { offerAccepted: true },
      },
      {
        new: true,
      }
    );
    await CurrentJob.findByIdAndUpdate(
      reportid,
      {
        $pull: { appliedJobs: biddingid },
      },
      {
        new: true,
      }
    );

    await CurrentJob.findByIdAndUpdate(
      reportid,
      {
        $push: { currentJobs: biddingid },
      },
      {
        new: true,
      }
    );
    res.status(200).json("Data has been put!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// decline the offer

router.put("/declineoffer/:reportid/:biddingid", async (req, res) => {
  const reportid = req.params.reportid;
  const biddingid = req.params.biddingid;
  try {
    await Bidding.findByIdAndUpdate(
      biddingid,
      {
        $set: { offerDeclined: true },
      },
      {
        new: true,
      }
    );
    await CurrentJob.findByIdAndUpdate(
      reportid,
      {
        $pull: { appliedJobs: biddingid },
      },
      {
        new: true,
      }
    );

    await CurrentJob.findByIdAndUpdate(
      reportid,
      {
        $push: { declinedJobs: biddingid },
      },
      {
        new: true,
      }
    );
    res.status(200).json("Data has been put!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// complete the job

router.put("/completejob/:reportid/:biddingid", async (req, res) => {
  const date = new Date();
  const reportid = req.params.reportid;
  const biddingid = req.params.biddingid;
  try {
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { assignedContractor: biddingid },
      },
      {
        new: true,
      }
    );

    // Task 4 start
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { "Timeline.taskFour.createdAt": date },
      },
      {
        new: true,
      }
    );
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { "Timeline.taskFour.completeJob": true },
      },
      {
        new: true,
      }
    );
    // Task 4 end

    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { taskComplete: true },
      },
      {
        new: true,
      }
    );

    await Bidding.findByIdAndUpdate(
      biddingid,
      {
        $set: { completedJob: true },
      },
      {
        new: true,
      }
    );
    await CurrentJob.findByIdAndUpdate(
      reportid,
      {
        $pull: { currentJobs: biddingid },
      },
      {
        new: true,
      }
    );

    await CurrentJob.findByIdAndUpdate(
      reportid,
      {
        $push: { completeJobs: biddingid },
      },
      {
        new: true,
      }
    );
    res.status(200).json("Job has been completed!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// incomplete the job

router.put("/incompletejob/:reportid/:biddingid", async (req, res) => {
  const reportid = req.params.reportid;
  const biddingid = req.params.biddingid;
  try {
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $unset: { assignedContractor: "" },
      },
      {
        new: true,
      }
    );
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { taskIncomplete: true },
      },
      {
        new: true,
      }
    );

    await Bidding.findByIdAndUpdate(
      biddingid,
      {
        $set: { incompletedJob: true },
      },
      {
        new: true,
      }
    );

    await CurrentJob.findByIdAndUpdate(
      reportid,
      {
        $pull: { currentJobs: biddingid },
      },
      {
        new: true,
      }
    );

    await CurrentJob.findByIdAndUpdate(
      reportid,
      {
        $push: { incompleteJobs: biddingid },
      },
      {
        new: true,
      }
    );
    res.status(200).json("job has been incompleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
