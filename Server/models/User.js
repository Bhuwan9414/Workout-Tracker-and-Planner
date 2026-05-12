const mongoose = require("mongoose")
const { Schema, lowercase } = require("zod")
const { type, required } = require("./zodValidation")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    weight: {
        type: Number,
        required: true,
    },

    height: {
        type: Number,
        required: true,
    },

    goal: {
        type: String,
        enum: [
            "build_muscle",
            "gain_strength",
            "fat_loss"
        ],
        required: true,
    }, 

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);