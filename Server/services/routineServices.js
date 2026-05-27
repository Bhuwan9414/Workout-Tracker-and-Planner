const routine = require("../models/RoutineModel")

const createRoutine = async function(data){

    const newRoutine = await routine.create({
        
        title,
        exercises

    })

    return newRoutine;

}


module.exports = createRoutine;