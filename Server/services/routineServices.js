const routine = require("../models/RoutineModel")
// const exercises = require("../models/exercisesModel")

const createRoutine = async function (data) {

    let exercisesList = data.exercises

    const exerciseIds = exercisesList.map(
        ex => ex.exerciseId
    );

    console.log(exerciseIds);


    //   const existingExercises = await 

    const newRoutine = await routine.create({

        userId: data.userId,
        title: data.title,
        exercises: data.exercises

    })

    return newRoutine;

}

const fetchRoutines = async function (userId) {

    // console.log(userId);


    let routines = await routine.find({ userId })
        .populate("exercises.exerciseId")
        .populate("userId", "name")



    if (!routines || routines.length === 0) {
        return []
    }

    return routines;

}

// for fetching single routine

const fetchSingle = async function (id, userId) {

    let fetchedRoutine = await routine.findOne({ _id: id, userId })
        .populate("exercises.exerciseId")

    if (!fetchedRoutine) {
        return []
    }

    return fetchedRoutine

}


// for deleting a specific routine

const deleteRoutine = async function (id, userId){

  const deleted =  await routine.findOneAndDelete({_id : id, userId})

  if(!deleted){
    throw new Error("Routine not found")
  }

  return deleted;

}

const updateRoutine = async function(id, userId, data){

    const updated = await routine.findOneAndUpdate(
        {_id: id, userId},
        {$set: data},
        {new: true}
    )

    if(!updated){

        throw new Error("Routine not found")

    }

    return updated;

}


module.exports = { createRoutine, fetchRoutines, fetchSingle, deleteRoutine, updateRoutine};