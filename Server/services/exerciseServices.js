const exercise = require("../models/exercisesModel");
const AppError = require("../utils/AppError");

const getAllExercises = async function(){

    const exercises = await exercise.find();

    if(!exercises){
        throw new AppError("Exercises not found", 404);
    }
    
    // console.log(exercises);
    

    return exercises;

}

module.exports = getAllExercises;