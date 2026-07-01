// get started

const workoutModel = require("../models/workoutModel")
const routines = require("../models/RoutineModel")


const startWorkoutService = async function (routineId) {


    const routine = routines.find(routineId)
    .populate("result : routine")


    if (!routine) {
        throw new Error("Routine not found")
    }

    const workout = await workoutModel.create({
        
    })


}