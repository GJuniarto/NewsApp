const { MongoClient } = require("mongodb");

const MONGO_DB_URI = "mongodb+srv://geryjuniarto99:Gwej0tKuMg7cxa7S@cluster0.2wckrxu.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGO_DB_URI);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db("users");
        console.log("Success connect to db");
    } catch (error) {
        console.log("Failed connect to db");
    }
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };
