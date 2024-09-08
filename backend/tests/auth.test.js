const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/auth");
require("dotenv").config();

const app = express(); // Create an Express application instance
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/auth", authRoutes); // Mount the authentication routes at the /auth endpoint

describe("POST /auth/login", () => {
  it("should return a JWT token when valid credentials are provided", async () => {
    // Make an HTTP POST request to the /auth/login endpoint with valid credentials
    const res = await request(app).post("/auth/login").send({
      username: process.env.USER_NAME,
      password: process.env.USER_PASSWORD,
    });

    // Check that the response status code is 200 (OK)
    expect(res.statusCode).toEqual(200);
    // Verify that the response body contains a token
    expect(res.body).toHaveProperty("token");
  });

  it("should return 401 when invalid credentials are provided", async () => {
    // Make an HTTP POST request to the /auth/login endpoint with invalid credentials
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "wrongUser", password: "wrongPass" });

    // Check that the response status code is 401 (Unauthorized)
    expect(res.statusCode).toEqual(401);
    // Verify that the response body contains the expected error message
    expect(res.body.message).toEqual("Invalid credentials");
  });
});
