const exercise = require("../models/exercisesModel")

const getAllExercises = async function(){

    const exercises = await exercise.find();
    
    console.log(exercises);
    

    return exercises;

}

module.exports = getAllExercises;