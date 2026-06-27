
// importing the routine services from services folder
const routineService = require("../services/routineServices")

// wrtiting the controller function for creating a routine which will handle the incoming and outgoing request
const createRoutine = async function (req, res) {


    try {

        // calling the createRoutine function from routine service
        // const result = await routineService.createRoutine(req.validatedData)


        const routineData = {
            ...req.validatedData,
            userId: req.user.id
        };




        const result = await routineService.createRoutine(
            routineData
        );

        // if success then return the success message and the routine

        res.status(201).json({

            message: "Routine created successfully",
            result

        })

    }
    catch (error) {

        // if any error occurs then return error message
        res.status(400).json({
            message: error.message
        })
    }

}

const getAllRoutines = async function (req, res) {

    try {

        const userid = req.user.id;

        // console.log(userid);


        const routines = await routineService.fetchRoutines(userid);

        res.status(200).json({
            message: "Routines fetched successfully",
            routines
        })

    }
    catch (error) {
        res.status(201).json({
            message: error.message
        })
    }

}

const fetchsingleRoutine = async function (req, res) {

    try {

        const id = req.params.id

        const userid = req.user.id;

        const routine = await routineService.fetchSingle(id, userid)

        res.status(200).json({
            message: "Routine fetched successfully",
            routine
        })

    }

    catch (error) {

        res.status(202).json({
            message: error.message
        })

    }

}




const deleteRoutineController = async function (req, res) {

    try {

        const id = req.params.id

        const userid = req.user.id;

        const deletedRoutine = await routineService.deleteRoutine(id, userid);

        res.status(200).json({
            message: "Routine deleted successfully"
        })

    }
    catch (error) {
        res.status(202).json({
            message: error.message
        })
    }

}

const updateRoutineController = async function (req, res) {

    try {

        const id = req.params.id

        const userid = req.user.id;

        const data = req.validatedData

        const updatedRoutine = await routineService.updateRoutine(id, userid, data)

        res.status(200).json({
            message : "routine updated successfully",
            updatedRoutine
        })

    }

    catch(error){

        res.status(202).json({
            message : error.message
        })

    }
}

module.exports = { createRoutine, getAllRoutines, fetchsingleRoutine, deleteRoutineController };