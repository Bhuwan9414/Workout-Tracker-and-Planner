const mongoose = require("mongoose");
// require("dotenv").config();

// connect to database

async function connectDB(){

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database conection successfull");
        
    }
    catch(error){
        console.log("DB connection failed");
        console.log(error.message);
        
    }

}

module.exports = connectDB;