// to be implemented


const express = require("express");

const routineController = require("../controllers/routineController")

const {routineValidation} = require("../middlewares/validation")

const routineSchema = require("../models/RoutineModel")

const router = express.Router();

router.post("/createRoutine",routineValidation(routineSchema), routineController)

module.exports = router;