const startWorkoutController = require("../controllers/workoutController");

const authMiddleware = require("../middlewares/authMiddleware")

const express = require("express");

const router = express.Router();

console.log("workout route is up");


router.post("/startWorkout",authMiddleware, startWorkoutController);

module.exports = router;