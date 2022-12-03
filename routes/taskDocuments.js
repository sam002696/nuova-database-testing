const TaskDocuments = require("../models/TaskDocuments");
const Tasks = require("../models/Tasks");

const router = require("express").Router();

// upsert task documents based on send task preferences

router.put("/:id", async (req, res) => {
  const taskid = req.params.id;
  const newTaskDocument = new TaskDocuments(req.body);
  try {
    const savedTaskDocuments = await newTaskDocument.save();
    const findTask = await Tasks.findById({ _id: taskid });

    if (findTask.sendTask === "Send to individual") {
      await Tasks.findByIdAndUpdate(
        taskid,
        {
          $set: { uploadSingleTask: savedTaskDocuments._id },
        },
        {
          new: true,
        }
      );
    } else {
      await Tasks.findByIdAndUpdate(
        taskid,
        {
          $push: { uploadAllTasks: savedTaskDocuments._id },
        },
        {
          new: true,
        }
      );
    }
    res.status(200).json(savedTaskDocuments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// make a specific task complete by sending task id

router.put("/taskComplete/:taskid", async (req, res) => {
  const taskid = req.params.taskid;
  try {
    await TaskDocuments.findByIdAndUpdate(
      taskid,
      {
        $set: { taskComplete: true },
      },
      {
        new: true,
      }
    );
    res.status(200).json("Task has been completed!!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
