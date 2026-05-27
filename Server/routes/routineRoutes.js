// to be implemented


const express = require("express");
const router = require("./authRoutes");

const routineController = require("../controllers/routineController")

const roputer = express.Router();

router.post("/createRoutine", routineController)

module.exports = router;