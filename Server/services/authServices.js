const { email } = require("zod");
const User = require("../models/User")
const generateToken = require("../utils/generateToken")
const bcrypt = require("bcrypt")

//  register a new user
const registerUser = async function (data) {

    const existingUser = await User.findOne({
        email: data.email
    })

    if (existingUser) {
        throw new Error("User already exists");
    }

    const { email, password, name, weight, height, goal } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password : hashedPassword,
        name,
        weight,
        height,
        goal
    });


    // token generation call
    const token = generateToken({
        id: user._id,
        email: user.email,
    })

    // console.log(user._id);
    

    return {
        user,
        token
    }

}

//  user login

const loginUser = async function (email, password) {


    const user = await User.findOne({
        email
    }).select("+password")



    if (!user) {
        throw new Error("User does not exist");
    }

    // comparing bcrypt hashed passowrd
    const isMatch = await bcrypt.compare(
        password,
        user.password
    )


    if(!isMatch){
        throw new Error("incorrect password");
    }

    

     const token = generateToken({
        id: user._id,
        email: user.email,
    });

        // Remove password before sending response
    user.password = undefined;


    return { user, token }
}

module.exports = { registerUser, loginUser }