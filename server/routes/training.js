const express = require("express");
const router = express.Router();
const Training = require("../models/Training");
const User = require("../models/User");

// Middleware to handle caching
router.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Assign training to an employee
router.post("/assign", async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const training = new Training({
      title,
      description,
      assignedTo: userId,
      assignedToName: user.name, // Store employee name
    });

    await training.save();
    res.status(201).json({ message: "Training assigned successfully", training });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to assign training" });
  }
});

// Get assigned training for an employee
router.get('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const trainings = await Training.find({ assignedTo: id });

    res.status(200).json(trainings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trainings' });
  }
});


// Get all employees for assigning training
router.get("/employees", async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });

    res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// Update training
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const updatedTraining = await Training.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!updatedTraining) {
      return res.status(404).json({ error: "Training not found" });
    }

    res.status(200).json(updatedTraining);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update training' });
  }
});

// Delete training
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTraining = await Training.findByIdAndDelete(id);

    if (!deletedTraining) {
      return res.status(404).json({ error: "Training not found" });
    }

    res.status(200).json({ message: 'Training deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete training' });
  }
});

module.exports = router;
