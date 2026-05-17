const express = require("express")

const router = express.Router();

const {register, login} = require("../controllers/authController")

const validate = require("../middlewares/validation")

const authMiddleware = require("../middlewares/authMiddleware")

const {registerSchema, loginSchema} = require("../models/zodValidation")

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), authMiddleware, login)

module.exports = router;