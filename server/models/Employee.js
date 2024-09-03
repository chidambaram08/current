const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    joinDate: { type: Date },
    role: { type: String },
    department: { type: String },
    location: { type: String },
    phone: { type: String, required: true },
});

module.exports = mongoose.model('user', EmployeeSchema);
