const express = require('express');
const router = express.Router();
const JobPosition = require('../models/JobPosition');

// Get all job positions
router.get('/', async (req, res) => {
    try {
        const jobs = await JobPosition.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new job position
router.post('/', async (req, res) => {
    const { title, location, description } = req.body;

    const job = new JobPosition({
        title,
        location,
        description
    });

    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a job position
router.put('/:id', async (req, res) => {
    try {
        const job = await JobPosition.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        job.title = req.body.title || job.title;
        job.location = req.body.location || job.location;
        job.description = req.body.description || job.description;

        const updatedJob = await job.save();
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a job position
router.delete('/:id', async (req, res) => {
    try {
        const job = await JobPosition.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        await job.remove();
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
