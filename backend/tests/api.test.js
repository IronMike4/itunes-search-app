const request = require("supertest");
const express = require("express");
const apiRoutes = require("../routes/api");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express(); // Create an Express application instance
app.use("/api", apiRoutes); // Mount the API routes at the /api endpoint

// Mock axios to control and simulate responses for tests
jest.mock("axios");
const axios = require("axios"); // Import axios after mocking

// Generate a valid JWT token using the secret from environment variables
const token = jwt.sign({ name: "mike" }, process.env.JWT_SECRET);

describe("GET /api/search", () => {
  beforeAll(() => {
    // Mock console.error to avoid cluttering test output with error logs
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore the original implementation of console.error after tests are finished
    console.error.mockRestore();
  });

  it("should return search results when a valid token is provided", async () => {
    // Mock axios.get to return a simulated response
    axios.get.mockResolvedValue({
      data: {
        results: [{ trackName: "test track", artistName: "test artist" }],
      },
    });

    // Make an HTTP GET request to the /api/search endpoint with a valid token
    const res = await request(app)
      .get("/api/search?term=rock&media=music")
      .set("Authorization", `Bearer ${token}`);

    // Check that the response status code is 200 (OK)
    expect(res.statusCode).toEqual(200);
    // Verify that the response body contains the expected track name
    expect(res.body.results[0].trackName).toEqual("test track");
  });

  it("should return 403 if no token is provided", async () => {
    // Make an HTTP GET request to the /api/search endpoint without a token
    const res = await request(app).get("/api/search?term=rock&media=music");

    // Check that the response status code is 403 (Forbidden)
    expect(res.statusCode).toEqual(403);
  });
});
