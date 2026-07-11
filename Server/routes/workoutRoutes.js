const {startWorkoutController, updateWorkoutController, completeWorkoutController} = require("../controllers/workoutController");

const authMiddleware = require("../middlewares/authMiddleware")

const express = require("express");

const router = express.Router();

console.log("workout route is up");


router.post("/startWorkout",authMiddleware, startWorkoutController);

router.patch("/:workoutId", authMiddleware, updateWorkoutController);

router.patch("/:workoutId/complete", authMiddleware, completeWorkoutController);

module.exports = router;