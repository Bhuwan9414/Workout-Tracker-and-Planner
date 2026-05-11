const authService = require("../services/authServices");

const register = async function(req, res){

        try {

            const result = await authService.registerUser(req.body)

            res.status(201).json({
                message : "Registration successfull",
                result
            })
        }
        catch(error){

            res.status(400).json({
                message : error.message
            })
        }

}

module.exports = {register}