const Bidding = require("../models/Bidding");
const ReportModel = require("../models/ReportModel");

const router = require("express").Router();

//create a maintenance report

router.post("/", async (req, res) => {
    const newReport = new ReportModel(req.body)
    try {
        const savedReport = await newReport.save()
        res.status(200).json(savedReport);
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all reports

router.get("/", async (req, res) => {
    const issue = req.query.issue;
    const contractorName = req.query.name;
    try {
        if (issue) {
            const reports = await ReportModel.findOne({ issueName: issue }).populate("contracBiddingInfo").populate("assignedContractor")
            res.status(200).json(reports);
        }
        else if (contractorName) {
            const reports = await ReportModel.findOne({ assignedContractorName: contractorName }).populate("contracBiddingInfo").populate("assignedContractor")
            res.status(200).json(reports);
        }
        else {
            const reports = await ReportModel.find().populate("contracBiddingInfo").populate("assignedContractor")
            res.status(200).json(reports);
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

//get a single report

router.get("/:id", async (req, res) => {
    try {
        const reports = await ReportModel.findById(req.params.id).populate("contracBiddingInfo")
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/singlereport", async (req, res) => {
    const newAssignedContrac = new Bidding(req.body)
    const contractorId = req.query.issue;
    try {
        const savedNewAssignedContrac = await newAssignedContrac.save();
        await ReportModel.findOneAndUpdate(contractorId, {
            $set: { assignedContractor: savedNewAssignedContrac._id }
        }, {
            new: true
        })
        await ReportModel.findOneAndUpdate(contractorId, {
            $set: { assignedContractorName: savedNewAssignedContrac.name }
        }, {
            new: true
        })
        res.status(200).json(savedNewAssignedContrac);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;