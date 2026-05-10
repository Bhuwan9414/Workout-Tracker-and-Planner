// main server file

// MONGO_URL = "mongodb://localhost:27017/WorkoutApp"

// setting up the server
const express = require("express");
const app = express();

require("dotenv").config();

const connectDB = require("./config/db")

connectDB();

app.get("/setupcheck", function(req, res){

    res.json({
        msg : "setup successfull"
    })

})


app.listen(process.env.PORT, function(){
    console.log("server is listening on port  " + process.env.PORT);
    
})