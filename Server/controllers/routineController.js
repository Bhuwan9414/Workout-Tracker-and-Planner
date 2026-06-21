
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

const getAllRoutines = async function(req, res){

    try {

        const userid = req.user.id;

        console.log(userid);
        

        const routines = await routineService.fetchRoutines(userid);

        res.status(200).json({
            message : "Routines fetched successfully",
            routines
        })

    }
    catch (error){
        res.status(201).json({
            message : error.message
        })
    }

}

module.exports = {createRoutine, getAllRoutines};