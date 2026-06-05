
// importing the routine services from services folder
const routineService = require("../services/routineServices")

// wrtiting the controller function for creating a routine which will handle the incoming and outgoing request
const createRoutine = async function (req, res) {


    try {

        // calling the createRoutine function from routine service
        const result = await routineService.createRoutine(req.validatedData)

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


module.exports = createRoutine;