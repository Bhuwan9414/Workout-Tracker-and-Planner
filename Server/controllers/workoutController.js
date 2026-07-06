const {startWorkoutService} = require("../services/workoutService");

const startWorkoutController = async function(req, res){

    try {

        const routineId = req.body.routineId;
        const userId =  req.user.id

        const workout = await startWorkoutService.startWorkoutService(routineId, userId)

        res.status(201).json({
            message : "workout initialised successfully",
            workout
        })

    }
     catch (error) {

        // if any error occurs then return error message
        res.status(400).json({
            message: error.message
        })
    }

}

module.exports = {
    startWorkoutController
}