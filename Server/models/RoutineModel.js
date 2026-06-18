const mongoose = require("mongoose");
// const { tr } = require("zod/v4/locales");

const setSchema = new mongoose.Schema({

    targetReps: {
        type: Number,
        required: true,
    },

    targetWeight: {
        type: Number,
        required: true
    }
})

// exerciseName: {
// type: String,
//     required: true
// },

const exerciseSchema = new mongoose.Schema({

    // type: mongoose.Schema.Types.ObjectId,

    exerciseName: {
        type : String,
        ref: "Exercise",
        required: true

    },
    sets: [setSchema]

})


const routineSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    exercises: [exerciseSchema]

})

module.exports = mongoose.model("Routine", routineSchema);