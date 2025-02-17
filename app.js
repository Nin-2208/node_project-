const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key', // Change this to a secure key
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Hardcoded Admin Credentials (Replace with env variables later)
const ADMIN_EMAIL = "admin@example.com";
// const ADMIN_PASSWORD_HASH = bcrypt.hashSync("admin123", 10); // Hash the password
const ADMIN_PASSWORD_HASH = "$2b$10$668BCjGJq3oQsKMeYVX.mOi/z6ORX67lfWIPMvv5Ovk5dyXUp2ktG"; // Pre-generated hash


// Passport Local Strategy for Admin
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    console.log("Login Attempt:", email, password); // Debugging line

    if (email !== ADMIN_EMAIL) {
        console.log("Email doesn't match");
        return done(null, false, { message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log("Password Match:", isMatch); // Debugging line

    if (!isMatch) {
        console.log("Incorrect Password");
        return done(null, false, { message: 'Invalid credentials' });
    }

    console.log("Login Successful");
    return done(null, { email: ADMIN_EMAIL }); // Store only email in session
}));

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    console.log("Deserializing user:", email); // Debugging line

    if (email === ADMIN_EMAIL) {
        return done(null, { email: ADMIN_EMAIL });
    }
    return done(null, false);
});


// Routes
const formRoutes = require('./routes/form');
const adminRoutes = require('./routes/admin');

app.use('/', formRoutes);
app.use('/admin', adminRoutes);

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
