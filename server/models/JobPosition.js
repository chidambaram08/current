const mongoose = require('mongoose');

const JobPositionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    applicants: { type: Number, default: 0 }
});

module.exports = mongoose.model('JobPosition', JobPositionSchema);
