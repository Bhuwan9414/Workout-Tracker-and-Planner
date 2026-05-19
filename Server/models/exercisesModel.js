const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({

    name : {
        type: String,
        unique: true
    },
    musclegroup : String

})