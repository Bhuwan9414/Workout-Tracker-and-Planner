const express = require("express");

const exerciseController = require("../controllers/exerciseController")

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/fetchExercises", authMiddleware, exerciseController)

module.exports = router;