const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Middleware to check if admin is logged in
function isAuthenticated(req, res, next) {
    console.log("Session User:", req.user); // Debugging line

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin/login');
}

// Admin Login Page
router.get('/login', (req, res) => {
    res.render('admin-login');
});

// Handle Admin Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login'
}));

// Admin Dashboard (Protected)
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch users from DB
        res.render('admin', { users }); // Ensure this EJS file exists!
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching users");
    }
});

module.exports = router;
