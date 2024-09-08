const express = require("express");
const axios = require("axios");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers["authorization"];

  // Check if the authorization header is missing
  if (!authHeader) {
    console.error("Authorization header missing");
    return res.sendStatus(403); // Forbidden
  }

  // Extract the token from the authorization header
  const token = authHeader.split(" ")[1]; // Expected format: "Bearer TOKEN"

  // Check if the token is missing
  if (!token) {
    console.error("Token missing from authorization header");
    return res.sendStatus(403); // Forbidden
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.sendStatus(403); // Forbidden
    }
    // Attach the user information to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

// Route to handle search requests
router.get("/search", authenticateToken, async (req, res) => {
  // Extract query parameters from the request
  const { term, media } = req.query;

  // Construct the API URL for the iTunes search
  const apiURL = `https://itunes.apple.com/search?term=${term}&media=${media}`;

  try {
    // Make a request to the iTunes Search API
    const response = await axios.get(apiURL);
    // Send the data received from the API as the response
    res.json(response.data);
  } catch (error) {
    // Handle errors from the API request
    res.status(500).json({ error: "Failed to fetch data" }); // Internal Server Error
  }
});

module.exports = router;
