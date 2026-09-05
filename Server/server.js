// main server file

//  reads the variables declared in the .env files and loads the value in process.env
require("dotenv").config();

// importing the express app from app.js file
const app = require("./app")

// importing the connectDB function from db.js
const connectDB = require("./config/db")

// calling the connectDB for connecting to database
connectDB();

// exposing the app on localhost:3000
app.listen(process.env.PORT, function(){
    console.log("server is listening on port  " + process.env.PORT);
})

// branch check
