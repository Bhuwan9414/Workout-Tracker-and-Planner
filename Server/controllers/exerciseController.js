const exerciseService = require("../services/exerciseServices")

const exerciseController = async function(req, res, next) {
    
    try {
        const exercises = await exerciseService();

        // console.log("controller");
        

        res.status(200).json({
            message : "fetch successfull",
            exercises
        })
    }

    catch(error){
        // res.status(201).json({
        //     message : error.message
        // })

        next(error);
    }
}

module.exports = exerciseController;