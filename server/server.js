const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const trainingRoutes = require("./routes/training");
const jobPositionsRouter = require("./routes/jobPositions");
const performanceRoutes = require("./routes/performanceRoutes"); 


// Add this line below other routes


// Import performance routes
require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/employees", employeeRoutes);
app.use("/api/training", trainingRoutes);
app.use("/job-positions", jobPositionsRouter);
app.use("/api/performance", performanceRoutes); // Add performance route


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
