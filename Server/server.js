// main server file

// MONGO_URL = "mongodb://localhost:27017/WorkoutApp"

// setting up the server
// const express = require("express");

require("dotenv").config();

const app = require("./app")


const connectDB = require("./config/db")

connectDB();

app.listen(process.env.PORT, function(){
    console.log("server is listening on port  " + process.env.PORT);
})