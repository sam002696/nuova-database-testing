const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
    {
        propertyType: {
            type: String,
            required: true
        },
        propertyDesc: {
            type: String,
            required: true
        },
        street1: {
            type: String,
            required: true
        },
        street2: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postCode: {
            type: Number,
            required: true
        },
        unitName: {
            type: String,
            required: true
        },
        Beds: {
            type: Number,
            required: true
        },
        Baths: {
            type: Number,
            required: true
        },
        Size: {
            type: Number,
            required: true
        },
        markedRent: {
            type: String,
            required: true
        },
        tenantDetails: {
            type: [String],
            ref: "uploadTenant"
        },
        tenantName: {
            type: [String],
            ref: "uploadTenant"
        }
    }, { timestamps: true })

module.exports = mongoose.model("Property", PropertySchema);