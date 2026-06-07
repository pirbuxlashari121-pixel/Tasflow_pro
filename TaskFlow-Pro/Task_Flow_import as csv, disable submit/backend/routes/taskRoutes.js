const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET ALL TASKS
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ADD TASK
router.post("/", async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
  });

  await newTask.save();

  res.json(newTask);
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Task deleted",
  });
});
// EDIT TASK
router.put("/edit/:id", async (req, res) => {

  const updatedTask =
    await Task.findByIdAndUpdate(

      req.params.id,

      {
        title: req.body.title,
      },

      {
        new: true,
      }
    );

  res.json(updatedTask);
});

// TOGGLE COMPLETE
router.put("/:id", async (req, res) => {

  const task = await Task.findById(req.params.id);

  task.completed = !task.completed;

  await task.save();

  res.json(task);
});

module.exports = router;