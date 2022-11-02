const mongoose = require("mongoose");

const uploadTenantSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true
        },
        documents: {
            type: String,
            required: true
        }
    }, { timestamps: true })

module.exports = mongoose.model("uploadTenant", uploadTenantSchema);