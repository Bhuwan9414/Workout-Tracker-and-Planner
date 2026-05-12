const User = require("../models/User")

//  register a new user
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

//  user login

const loginUser = async function(email, password){

    const user = await User.findOne({
        email
    }).select("+password")

   if(!user){
    throw new Error("User does not exist");
   }

   return {user}
}

module.exports = {registerUser, loginUser}

