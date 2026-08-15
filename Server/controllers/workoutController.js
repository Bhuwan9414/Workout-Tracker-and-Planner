// importing the workout services
const { startWorkoutService, updateWorkoutService, completeWorkout, fetchWorkoutService, fetchSingleWorkout, fetchActiveService} = require("../services/workoutService");


const startWorkoutController = async function (req, res) {

    try {

        
        const routineId = req.body.routineId;
        const userId = req.user.id

        const workout = await startWorkoutService(routineId, userId)

        console.log(workout);


        res.status(201).json({
            message: "workout initialised successfully",
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


// const { updateWorkoutService } = require("../services/workoutService");

const updateWorkoutController = async (req, res) => {

    try {

        const { workoutId } = req.params;

        const {
            setId,
            actualWeight,
            actualReps,
            completed
        } = req.body;

        const userId = req.user.id;

        const updatedWorkout = await updateWorkoutService(
            workoutId,
            userId,
            setId,
            actualWeight,
            actualReps,
            completed
        );

        return res.status(200).json({
            message: "Workout updated successfully",
            workout: updatedWorkout
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }

};


const completeWorkoutController = async function (req, res) {

    try {

        const { workoutId } = req.params;
        const userId = req.user.id;


        const completedWorkout = await completeWorkout(workoutId, userId)
        return res.status(200).json({
            message: "Workout completed",
            workout: completedWorkout
        });


    }

    catch (error) {

        return res.status(400).json({
            message: error.message
        });


    }

}

const fetchWorkoutController = async function(req, res){

    try {

        const userId = req.user.id;

        const workouts = await fetchWorkoutService(userId);

        return res.status(201).json({

            message : "workouts fetched successfully",
            workouts

        })
    }

    catch(error){

        res.status(400).json({
            error : error.message
        });

    }

}

const fetchSingleWorkoutController = async function(req, res){

    try{

        const userId = req.user.id;
        const workoutId = req.params.id;

        const singleWorkout = await fetchSingleWorkout(userId, workoutId)

          res.status(200).json({
            message: "Workout fetched successfully",
            singleWorkout
        })
    }
    catch(error){

        res.status(400).json({
            message:error.message
        })

    }

}

const fetchActiveController = async function(req, res){

    try{

        const userId = req.user.id;
        
        const activeWorkout = await fetchActiveService(userId);
        

        res.status(201).json({

            message : "Active workouts fetched",
             activeWorkout
        })

        // console.log(activeWorkout);
        


    }
    catch(error){

        res.status(404).json({
            message : error.message
        })

    }

}


module.exports = { startWorkoutController, updateWorkoutController, completeWorkoutController, fetchWorkoutController, fetchSingleWorkoutController, fetchActiveController}
