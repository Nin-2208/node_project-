const bcrypt = require('bcrypt');

const password = "admin123"; // Your desired admin password
const saltRounds = 10; // Recommended salt rounds

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error("Error generating hash:", err);
    } else {
        console.log("Generated Hash:", hash);
    }
});
