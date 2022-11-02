const mongoose = require("mongoose");

const CurrentJobSchema = new mongoose.Schema(
    {
        issueName: {
            type: String,
            required: true,
        },
        tenantAddress: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    }, { timestamps: true })

module.exports = mongoose.model("CurrentJob", CurrentJobSchema);