const express = require("express");

const exerciseController = require("../controllers/exerciseController")

const router = express.Router();

router.get("fetchExercises", exerciseController)

module.exports = router;