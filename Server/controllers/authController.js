const authService = require("../services/authServices");

const register = async function(req, res, next){

        try {

            const result = await authService.registerUser(req.validatedData)

            res.status(201).json({
                message : "Registration successfull",
                result
            })

            console.log(result);
            
        }
        catch(error){

              next(error);

        }

}

const login = async function(req, res, next){

    try {
        const result = await authService.loginUser(
            req.body.email,
            req.body.password
        )

        res.status(200).json({
            message : "Login successfull",
            data : result
        })
    } 
    catch(error){
        // res.status(401).json({
        //     success: false,
        //     message: error.message
        // });
        // console.log(error.message);

        next(error);
        
    }

}

module.exports = {register, login}