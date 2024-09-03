const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

// Add a new employee
exports.addEmployee = async (req, res) => {
    try {
        const { name, email, password, gender, joinDate, role, department, location, phone } = req.body;

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new employee with the hashed password
        const newEmployee = new Employee({
            name,
            email,
            password: hashedPassword,
            gender,
            joinDate,
            role,
            department,
            location,
            phone,
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Other controller functions (e.g., getEmployees, getEmployeeById, updateEmployee, deleteEmployee) can be added similarly
