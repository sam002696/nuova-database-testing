const mongoose = require("mongoose");

const ProspectsSchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
    },
    propertyAddress: {
      type: String,
    },
    propertyRent: {
      type: String,
    },
    beds: {
      type: Number,
    },
    baths: {
      type: Number,
    },
    propertyAvailableDate: {
      type: Date,
    },
    propertyPic: {
      type: String,
    },
    book: {
      preferredDay: {
        type: Date,
      },
      preferredTime: {
        type: String,
      },
    },
    details: {
      address: {
        type: String,
      },
      emailAddress: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      mobile: {
        type: Number,
      },
      moveindate: {
        type: Date,
      },
    },

    extraInfo: {
      adults: {
        type: Number,
      },
      adverseCard: {
        type: String,
      },
      children: {
        type: Number,
      },
      currentOccupation: {
        type: String,
      },
      householdIncome: {
        type: Number,
      },
      jobTitle: {
        type: String,
      },
      lengthOfStay: {
        type: String,
      },
      livingArrangement: {
        type: String,
      },
      pets: {
        type: String,
      },
      reasonForMoving: {
        type: String,
      },
      relevantInfo: {
        type: String,
      },
      smoker: {
        type: String,
      },
      ukBasedGurantor: {
        type: String,
      },
    },

    preferences: {
      maxBeds: {
        type: Number,
      },
      maxRent: {
        type: Number,
      },
      parking: {
        type: String,
      },
      preference: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prospects", ProspectsSchema);
