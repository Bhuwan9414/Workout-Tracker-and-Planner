const mongoose = require("mongoose");

// connect to database

        // console.log(process.env.MONGO_URL);

        const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


async function connectDB(){

    try {
        await mongoose.connect(process.env.MONGO_URL)
        // console.log(process.env.MONGO_URL);
        
        console.log("database conection successfull");
        
    }
    catch(error){
        console.log("DB connection failed");
        console.log(error.message);
        
    }

}

module.exports = connectDB;