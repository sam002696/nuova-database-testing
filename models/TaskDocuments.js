const mongoose = require("mongoose");

const TasksDocumentsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    useremail: {
      type: String,
    },
    uploadDoc: {
      type: String,
    },
    uploadImage: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    chatId: {
      type: String,
    },
    taskComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasksDocuments", TasksDocumentsSchema);
