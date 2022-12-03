const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema(
  {
    assignedUsername: {
      type: String,
    },
    assignedUseremail: {
      type: String,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    taskDesc: {
      type: String,
      required: true,
    },
    sendTask: {
      type: String,
      required: true,
    },
    uploadSingleTask: {
      type: String,
      ref: "tasksDocuments",
    },
    uploadAllTasks: {
      type: [String],
      ref: "tasksDocuments",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TasksSchema);
