const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

let mongod = null;

const connectDB = async () => {
  try {
    let dbUrl = process.env.CONNECTION_STRING;

    if (process.env.NODE_ENV === "test") {

        console.log("db test mode");
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }

    const conn = await mongoose.connect(dbUrl);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    throw new Error("problem with connection to DB");
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };
