const mongoose = require("mongoose");

const exerModel = require("../models/exercisesModel")
const exercises = require("../models/Exercises");

mongoose.connect("mongodb+srv://sutharbhuwan2_db_user:XIAdcr6EoxhglOfs@cluster1.z0szuix.mongodb.net/exercisesDB")

async function seed() {

    try {
        // remove old data
        await exerModel.deleteMany({});

        // insert new data
        await exerModel.insertMany(exercises);

        console.log("Database seeded!");
    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

seed();