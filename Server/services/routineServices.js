const routine = require("../models/RoutineModel")

const createRoutine = async function(data){

       
    const newRoutine = await routine.create({
        
        userId : data.userId,
        title : data.title,
        exercises : data.exercises

    })

    

    return newRoutine;

}


module.exports = {createRoutine};