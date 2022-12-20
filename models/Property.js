const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    landlordInfo: {
      landlordName: {
        type: String,
      },
      landlordEmail: {
        type: String,
      },
      landlordPhone: {
        type: Number,
      },
    },
    property: {
      type: String,
    },
    propertyType: {
      type: String,
    },
    propertyAddress: {
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      addressline1: {
        type: String,
      },
      addressline2: {
        type: String,
      },
      zipcode: {
        type: Number,
      },
    },
    propertyDetails: {
      propertyFloor: {
        type: String,
      },
      propertyEstimatedValue: {
        type: Number,
      },
      livingArea: {
        type: Number,
      },
      bedroom: {
        type: Number,
      },
      bathroom: {
        type: Number,
      },
      availibilityDate: {
        type: Date,
      },
      propertyFurnished: {
        type: String,
      },
      propertyAddress: {
        type: String,
      },
      councilTaxBand: {
        type: String,
      },
      petsPermission: {
        type: String,
      },
      studentsAccept: {
        type: String,
      },
      toLet: {
        type: String,
      },
      rooms: {
        type: [String],
      },
      roomsOther: {
        type: String,
      },
      featuresAndAppliances: {
        type: [String],
      },
      featuresAndAppliancesOther: {
        type: String,
      },
      externalAreasFacilities: {
        type: String,
      },
      sharedAreasFacilities: {
        type: String,
      },
      excludedAreaFacilities: {
        type: String,
      },
      permitSuppliedBy: {
        type: String,
      },
      spaceNumber: {
        type: Number,
      },
      permitsPerProperty: {
        type: Number,
      },
      spaceLocation: {
        type: String,
      },
      entryCode: {
        type: String,
      },
      remoteFob: {
        type: String,
      },
      suppliedBy: {
        type: String,
      },
    },
    units: [
      {
        baths: {
          type: Number,
        },
        beds: {
          type: Number,
        },
        marketRent: {
          type: Number,
        },
        size: {
          type: Number,
        },
        unitName: {
          type: String,
        },
      },
    ],
    keyFeatures: [
      {
        label: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    briefDesc: {
      briefDesc: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
    images: {
      pictureFirst: {
        type: String,
      },

      pictureSecond: {
        type: String,
      },

      pictureThird: {
        type: String,
      },

      pictureFourth: {
        type: String,
      },
    },

    tenantDetails: {
      type: [String],
      ref: "uploadTenant",
    },
    tenantName: {
      type: [String],
      ref: "uploadTenant",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
