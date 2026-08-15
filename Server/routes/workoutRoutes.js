//  importing the workout controllers from the controller file
const {startWorkoutController, updateWorkoutController, completeWorkoutController, fetchWorkoutController, fetchSingleWorkoutController, fetchActiveController} = require("../controllers/workoutController");

// importing the auth middleware from middleware file
const authMiddleware = require("../middlewares/authMiddleware")

// importing express into our app
const express = require("express");

// importing router method from express library
const router = express.Router();

// using the post methdod for startworkout api
router.post("/startWorkout",authMiddleware, startWorkoutController);

router.get("/fetchWorkouts", authMiddleware, fetchWorkoutController);

router.get("/activeWorkouts", authMiddleware, fetchActiveController);

router.patch("/:workoutId/complete", authMiddleware, completeWorkoutController);

router.patch("/:workoutId", authMiddleware, updateWorkoutController);

router.get("/:id", authMiddleware, fetchSingleWorkoutController);

// exporting the router module
module.exports = router;