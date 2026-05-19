// importing the EXPRESS packages (bringing express lib here)
const express = require("express");

// importing the auth Routes
const authRoutes = require("./routes/authRoutes");

//  creating the express app after this we can use all express methods
const app = express();

// parses the incoming json in req.body to js object
// app.use is used to run middlewares between request and response
app.use(express.json());

//  using the auth route
app.use("/api/auth", authRoutes);

module.exports = app;