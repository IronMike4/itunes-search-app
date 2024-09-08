const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Route to handle user login and JWT token generation
router.post("/login", (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Retrieve valid credentials from environment variables
  const validUsername = process.env.USER_NAME;
  const validPassword = process.env.USER_PASSWORD;

  // Check if provided credentials match the valid credentials
  if (username === validUsername && password === validPassword) {
    // Create a payload with user information for the token
    const payload = { name: username };

    // Retrieve the secret key for signing the token
    const secret = process.env.JWT_SECRET;

    // Generate a JWT token with the payload and secret
    const token = jwt.sign(payload, secret);

    // Send the token as a JSON response
    res.json({ token });
  } else {
    // If credentials are invalid, send a 401 Unauthorized response
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
