const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({

    name : {
        type: String,
        unique: true
    },
    muscleGroup : {
        type: String,
    }

})

module.exports = mongoose.model("Exercises", exerciseSchema)