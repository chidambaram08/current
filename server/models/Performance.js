// models/Performance.js
const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The admin or manager evaluating
  performanceRating: { type: Number, required: true }, // Rating out of 5
  feedback: { type: String, required: true }, // Additional feedback for the employee
  evaluationDate: { type: Date, default: Date.now }, // Date of the performance evaluation
});

module.exports = mongoose.model('Performance', performanceSchema);
