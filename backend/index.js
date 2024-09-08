require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

const app = express(); // Create an instance of the Express application

// Use CORS middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Use the JSON middleware to parse JSON request bodies
app.use(express.json());

// Define routes for the API endpoints
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

// Define the port number for the server to listen on
const PORT = process.env.PORT || 5001;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
