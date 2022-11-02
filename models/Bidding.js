const mongoose = require("mongoose");

const BiddingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneno: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        BiddingAmount: {
            type: Number,
            required: true
        }
    }, { timestamps: true })

module.exports = mongoose.model("Bidding", BiddingSchema);