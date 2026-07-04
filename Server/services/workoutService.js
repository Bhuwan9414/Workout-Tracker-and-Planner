const workoutModel = require("../models/workoutModel");
const routineModel = require("../models/RoutineModel");

const startWorkoutService = async (routineId, userId) => {

    // Find the routine
    const routine = await routineModel.findById(routineId);

    if (!routine) {
        throw new Error("Routine not found");
    }

    // Check ownership
    if (routine.userId.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    // Calculate summary fields
    const totalExercises = routine.exercises.length;

    let totalSets = 0;

    // Transform routine exercises into workout exercises
    const workoutExercises = routine.exercises.map((exercise) => {

        totalSets += exercise.sets.length;

        return {

            exerciseId: exercise.exerciseId,
            exerciseName: exercise.exerciseName,

            sets: exercise.sets.map((set) => {

                return {

                    plannedWeight: set.targetWeight,
                    plannedReps: set.targetReps,

                    actualWeight: null,
                    actualReps: null,

                    completed: false
                };

            })

        };

    });

    // Create workout object
    const workout = {

        userId: routine.userId,
        routineId: routine._id,
        routineTitle: routine.title,

        status: "active",

        startedAt: new Date(),
        completedAt: null,
        duration: null,

        exercises: workoutExercises,

        totalExercises,
        totalSets,
        totalVolume: 0
    };

    // Save workout
    const newWorkout = await workoutModel.create(workout);

    return newWorkout;

    console.log(newWorkout);
    
};

module.exports = {
    startWorkoutService
};