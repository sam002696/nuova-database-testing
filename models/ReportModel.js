const mongoose = require("mongoose");

const ReportModelSchema = new mongoose.Schema(
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
    contracBiddingInfo: {
      type: [String],
      ref: "Bidding",
    },
    assignedContractorName: {
      type: String,
    },
    assignedContractor: {
      type: String,
      ref: "Bidding",
    },
    post: {
      type: Boolean,
      default: false,
    },
    requiredExperience: {
      type: String,
    },
    timeline: {
      type: String,
    },
    jobid: {
      type: String,
    },
    taskComplete: {
      type: Boolean,
      default: false,
    },
    taskIncomplete: {
      type: Boolean,
      default: false,
    },
    Timeline: {
      taskOne: {
        createdAt: {
          type: Date,
        },
        maintenanceReq: {
          type: Boolean,
          default: false,
        },
      },
      taskTwo: {
        createdAt: {
          type: Date,
        },
        postJob: {
          type: Boolean,
          default: false,
        },
      },
      taskThree: {
        createdAt: {
          type: Date,
        },
        assignJob: {
          type: Boolean,
          default: false,
        },
      },
      taskFour: {
        createdAt: {
          type: Date,
        },
        completeJob: {
          type: Boolean,
          default: false,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReportModel", ReportModelSchema);
