// importing the EXPRESS packages (bringing express lib here)
const express = require("express");

// importing the auth Routes
const authRoutes = require("./routes/authRoutes");

// importing routine routes
const routineRoutes = require("./routes/routineRoutes");

// importing the exercise routes
const exerciseRoutes = require("./routes/exerciseRoutes");

//  creating the express app after this we can use all express methods
const app = express();

// parses the incoming json in req.body to js object
// app.use is used to run middlewares between request and response
app.use(express.json());

//  using the auth route
app.use("/api/auth", authRoutes);

// using the routine routes
app.use("/api/routine", routineRoutes);

// using the exercise routes
// console.log("fetching the exercises");

app.use("/api/exercise", exerciseRoutes)

module.exports = app;