// routes/performance.js
const express = require("express");
const router = express.Router();
const Performance = require("../models/Performance");
const User = require("../models/User");

// Middleware to handle caching
router.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Assign a performance review to an employee
router.post("/assign", async (req, res) => {
  try {
    const { employeeId, evaluatorId, performanceRating, feedback } = req.body;

    // Check for required fields
    if (!employeeId || !evaluatorId || !performanceRating || !feedback) {
      console.error("Error: Missing fields in request body");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate employee existence
    const employee = await User.findById(employeeId);
    if (!employee) {
      console.error("Error: Employee not found");
      return res.status(404).json({ error: "Employee not found" });
    }

    // Validate evaluator existence
    const evaluator = await User.findById(evaluatorId);
    if (!evaluator) {
      console.error("Error: Evaluator not found");
      return res.status(404).json({ error: "Evaluator not found" });
    }

    // Create and save performance review
    const performance = new Performance({
      employee: employeeId,
      evaluator: evaluatorId,
      employeeName: employee.name,  // Optional: store employee's name for easy access
      evaluatorName: evaluator.name, // Optional: store evaluator's name for easy access
      performanceRating,
      feedback,
    });

    await performance.save();
    res.status(201).json({ message: "Performance assigned successfully", performance });
  } catch (err) {
    console.error("Error assigning performance:", err);
    res.status(500).json({ error: "Failed to assign performance" });
  }
});

module.exports = router;
