const jwt = require("jsonwebtoken")
require("dotenv").config();

const generateToken = function(data){

    const token = jwt.sign({
        data
    }, process.env.JWT_SECRET,{
        expiresIn : "1h"
    })

    return token;
    

}

module.exports = generateToken