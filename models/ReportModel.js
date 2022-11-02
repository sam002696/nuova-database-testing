const mongoose = require("mongoose");

const ReportModelSchema = new mongoose.Schema(
    {
        issueName: {
            type: String,
            required: true,
            unique: true
        },
        tenantAddress: {
            type: String,
            required: true
        },
        contracBiddingInfo: {
            type: [String],
            ref: "Bidding"
        },
        assignedContractorName: {
            type: String
        },
        assignedContractor: {
            type: String,
            ref: "Bidding"
        }

    }, { timestamps: true })

module.exports = mongoose.model("ReportModel", ReportModelSchema);