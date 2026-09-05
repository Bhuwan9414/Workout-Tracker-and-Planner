// importing the EXPRESS packages (bringing express lib here)
const express = require("express");

// importing the auth Routes
const authRoutes = require("./routes/authRoutes");

// importing routine routes
const routineRoutes = require("./routes/routineRoutes");

// importing the exercise routes
const exerciseRoutes = require("./routes/exerciseRoutes");

// importing the workout routes
const workoutRoutes = require("./routes/workoutRoutes");

const cors = require("cors");

const errorMiddleware = require("./middlewares/errorMiddleware");

//  creating the express app after this we can use all express methods
const app = express();

// app.use(cors());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

// parses the incoming json in req.body to js object
// app.use is used to run middlewares between request and response
app.use(express.json());

//  using the auth route
app.use("/api/auth", authRoutes);

// using the routine routes
app.use("/api/routine", routineRoutes);

// using the exercise routes
// console.log("fetching the exercises");

app.use("/api/exercise", exerciseRoutes);

// using the workout routes

app.use("/api/workout", workoutRoutes);

// app.use(errorMiddleware)

module.exports = app;