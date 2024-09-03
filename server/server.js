const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const trainingRoutes = require('./routes/training');
const jobPositionsRouter = require('./routes/jobPositions');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/employees', employeeRoutes);
app.use('/api/training', trainingRoutes);
app.use('/job-positions', jobPositionsRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));