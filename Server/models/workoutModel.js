//  get started

const mongoose = require("mongoose");
const setSchema = new mongoose.Schema({

    plannedWeight: {
        type: Number,
        required: true
    },
    plannedReps: {
        type: Number,
        required: true
    },
    actualWeight: {
        type: Number,
        default: null
    },
    actualReps: {
        type: Number,
        default: null
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const exercisesSchema = new mongoose.Schema({

    exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercises",
        required: true
    },
    exerciseName: {
        type: String,
        required: true
    },
    sets: [setSchema]
})


const workoutSchema = new mongoose.Schema({


    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    routineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Routine",
        required: trueroutine
    },
    routineTitle: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "discarded"],
        default: "active"
    },
    startedAt: {
        type: Date,
        required: true
    },
    completedAt: {
        type: Date,
    },
    duration: {
        type: Number,
    },

    exercises: [exercisesSchema],

    totalExercises: {
        type: Number,
        default: 0
    },
    totalSets: {
        type: Number,
        default: 0
    },
    totalVolume: {
        type: Number,
        default: 0
    }

}, { timestamps: true })


module.exports = mongoose.model("Workout", workoutSchema);