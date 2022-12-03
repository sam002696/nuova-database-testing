const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNo: {
      type: Number,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    occupation: {
      type: String,
    },
    currentAddress: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
