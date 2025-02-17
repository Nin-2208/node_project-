const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Render form
router.get('/submit', (req, res) => {
    res.render('form');
});

// Handle form submission
router.post('/submit', async (req, res) => {
    const { name, email, bio } = req.body;
    try {
        await User.create({ name, email, bio });
        res.send('Data saved successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data');
    }
});

module.exports = router;
