// using the express library to use everything that express exports
const express = require("express");

//  importing the routine controller
const routineController = require("../controllers/routineController")

// importing the validator for routine schema validation
const {routineValidation} = require("../middlewares/validation")

// importing the zod defined  routine schema
const {routineSchema} = require("../models/zodValidation")

// importing the jwt auth middleware
const authMiddleware = require("../middlewares/authMiddleware")

// using the router methods from express library
const router = express.Router();

// using the post method
router.post("/createRoutine",routineValidation(routineSchema), authMiddleware, routineController)

module.exports = router;