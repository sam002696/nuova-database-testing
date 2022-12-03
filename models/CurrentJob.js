const mongoose = require("mongoose");

const CurrentJobSchema = new mongoose.Schema(
  {
    issueName: {
      type: String,
    },
    tenantAddress: {
      type: String,
    },
    email: {
      type: String,
    },
    requiredExperience: {
      type: String,
    },
    timeline: {
      type: String,
    },
    contractorBiddingEmail: {
      type: String,
      ref: "Bidding",
    },
    appliedJobs: {
      type: [String],
      ref: "Bidding",
    },
    currentJobs: {
      type: [String],
      ref: "Bidding",
    },
    declinedJobs: {
      type: [String],
      ref: "Bidding",
    },
    completeJobs: {
      type: [String],
      ref: "Bidding",
    },
    incompleteJobs: {
      type: [String],
      ref: "Bidding",
    },
    jobid: {
      type: String,
    },
    postBidding: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CurrentJob", CurrentJobSchema);
