const User = require("../models/User")

const registerUser = async function(data){

    const existingUser = await User.findOne({
        email: data.email
    })

    if(existingUser){
        throw new Error("User already exists");
    }

    const user = await User.create(data);

    return{
        user
    }

}

module.exports = {registerUser}