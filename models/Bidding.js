const mongoose = require("mongoose");

const BiddingSchema = new mongoose.Schema(
  {
    contractorName: {
      type: String,
      required: true,
    },
    contractorEmail: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    BiddingAmount: {
      type: Number,
      required: true,
    },
    offerAccepted: {
      type: Boolean,
      default: false,
    },
    offerDeclined: {
      type: Boolean,
      default: false,
    },
    completedJob: {
      type: Boolean,
      default: false,
    },
    incompletedJob: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bidding", BiddingSchema);
