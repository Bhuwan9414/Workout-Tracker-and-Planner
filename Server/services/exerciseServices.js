const exercise = require("../models/exercisesModel")

const getAllExercises = async function(){

    const exercises = await exercise.find();
    

    return exercises;

}

module.exports = {getAllExercises};