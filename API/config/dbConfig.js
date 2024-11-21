//import multer, { Multer, StorageEngine } from "multer"; // ts format
const mongoose = require("mongoose");

//Environment variables
require('dotenv').config();

const mongoDB = process.env.MONGODB_URI;
//const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;


db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connected", console.log.bind(console, "MongoDB connected"));

module.exports = { db }; //upload