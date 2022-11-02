const Bidding = require("../models/Bidding");
const Report = require("../models/ReportModel");


const router = require("express").Router();

//post a bidding in report model Info using issue query

router.post("/", async (req, res) => {
    const newBidding = new Bidding(req.body)
    const issue = req.query.issue
    try {
        const savedBidding = await newBidding.save()
        await Report.findOneAndUpdate({ issueName: issue }, {
            $push: { contracBiddingInfo: newBidding._id },
        });
        res.status(200).json(savedBidding);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/:id", async (req, res) => {
    const biddingId = req.params.id;
    try {
        const singleBidding = await Bidding.findById(biddingId);
        res.status(200).json(singleBidding);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;