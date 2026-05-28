// to be implemented


const express = require("express");

const routineController = require("../controllers/routineController")

const router = express.Router();

router.post("/createRoutine", routineController)

module.exports = router;