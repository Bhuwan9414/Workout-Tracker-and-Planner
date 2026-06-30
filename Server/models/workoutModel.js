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
        required: true
    },
    actualReps: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
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
        required: true
    },
     routineTitle: {
        type: String,
        required: true
    },
     status: {
        type: Boolean,
        required: true
    },
     startedAt: {
        type: ,
        required: true
    },
    
})