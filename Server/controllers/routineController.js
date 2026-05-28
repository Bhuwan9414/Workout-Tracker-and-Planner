// to be done

const routineService = require("../services/routineServices")


const createRoutine = async function (req, res) {


    try {

        const result = await routineService.createRoutine(req.body)

        res.status(201).json({

            message: "Routine created successfully",
            result

        })

    }
    catch (error) {

        res.status(400).json({
            message: error.message
        })
    }

}


module.exports = createRoutine;