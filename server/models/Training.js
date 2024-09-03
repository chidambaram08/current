// models/Training.js
const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedToName: { type: String, required: true }, // Store employee name
  completed: { type: Boolean, default: false }, // Track completion status
});

module.exports = mongoose.model('Training', trainingSchema);
