const workoutModel = require("../models/workoutModel");
const routineModel = require("../models/RoutineModel");

const startWorkoutService = async (routineId, userId) => {

    // Find the routine
    const routine = await routineModel.findById(routineId)
        .populate("exercises.exerciseId", "name");

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
            exerciseName: exercise.exerciseId.name,

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

    console.log(workout.startedAt);


    // Save workout
    const newWorkout = await workoutModel.create(workout);

    return newWorkout;

    // console.log(newWorkout);

};



const updateWorkoutService = async (
    workoutId,
    userId,
    setId,
    actualWeight,
    actualReps,
    completed
) => {

    // Find the workout
    const workout = await workoutModel.findById(workoutId);

    if (!workout) {
        throw new Error("Workout not found");
    }

    // Check ownership
    if (workout.userId.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    // Workout should be active
    if (workout.status !== "active") {
        throw new Error("Workout is already completed or discarded");
    }

    let setFound = false;

    // Find the set and update it
    workout.exercises.forEach((exercise) => {

        exercise.sets.forEach((set) => {

            if (set._id.toString() === setId) {

                set.actualWeight = actualWeight;
                set.actualReps = actualReps;
                set.completed = completed;

                setFound = true;
            }

        });

    });

    if (!setFound) {
        throw new Error("Set not found");
    }

    await workout.save();

    return workout;

    console.log("service running successfully");
    
};

module.exports = { startWorkoutService, updateWorkoutService }