require("dotenv").config();
const jwt = require("jsonwebtoken");

// Define the payload for the JWT
const payload = {
  name: "User Name",
  password: "Password",
};

// Retrieve the JWT secret from environment variables
const secret = process.env.JWT_SECRET;

// Create a JWT token using the payload and secret
const token = jwt.sign(payload, secret);

// Print the generated JWT token to the console
console.log(token);
