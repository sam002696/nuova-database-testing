const CurrentJob = require("../models/CurrentJob");

const router = require("express").Router();

//post a job on the contractors hub

router.post("/", async (req, res) => {
    const newJob = new CurrentJob(req.body)
    try {
        const savedJob = await newJob.save()
        res.status(200).json(savedJob);
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all the jobs

router.get("/", async (req, res) => {
    try {
        const jobs = await CurrentJob.find({})
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json(err)
    }
})

// get a single job

router.get("/:id", async (req, res) => {
    try {
        const jobs = await CurrentJob.findById(req.params.id)
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;