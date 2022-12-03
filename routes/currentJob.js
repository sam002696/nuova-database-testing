const CurrentJob = require("../models/CurrentJob");
const ReportModel = require("../models/ReportModel");

const router = require("express").Router();

//post a job on the contractors hub

router.put("/:reportid", async (req, res) => {
  const date = new Date();
  const reportid = req.params.reportid;
  const newJob = new CurrentJob(req.body);
  try {
    await ReportModel.findByIdAndUpdate(
      reportid,
      { $set: { post: true } },

      { new: true }
    );

    // Task 2 start
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { "Timeline.taskTwo.createdAt": date },
      },
      {
        new: true,
      }
    );
    await ReportModel.findByIdAndUpdate(
      reportid,
      {
        $set: { "Timeline.taskTwo.postJob": true },
      },
      {
        new: true,
      }
    );
    // Task 2 end

    const savedJob = await newJob.save();

    res.status(200).json(savedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update single current job

router.put("/singlecurrentjob/:reportid", async (req, res) => {
  const reportid = req.params.reportid;
  try {
    const updatedCurrentJob = await CurrentJob.findByIdAndUpdate(
      reportid,
      { $set: req.body },
      { new: true }
    );

    await ReportModel.findByIdAndUpdate(
      reportid,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedCurrentJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all the jobs

router.get("/", async (req, res) => {
  try {
    const jobs = await CurrentJob.find({})
      .populate("appliedJobs")
      .populate("currentJobs")
      .populate("declinedJobs")
      .populate("completeJobs")
      .populate("incompleteJobs");
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single job

router.get("/:id", async (req, res) => {
  try {
    const jobs = await CurrentJob.findById(req.params.id);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a job using their single report id

router.get("/find/:reportid", async (req, res) => {
  try {
    await CurrentJob.findById(req.params.reportid);
    res.status(200).json("Found the job");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
