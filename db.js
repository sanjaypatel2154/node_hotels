const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDb Connection URL
//const mongoURL = 'mongodb://localhost:27017/hotels' //Replace 'mydatabase' with your databse name
//const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

//Set up MongoDB connection
// mongoose.connect(mongoURL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//OR
mongoose.connect(mongoURL);
//Het the default connection 
//Mongoose maintans a default connection object representing the MongoDB connectionn.
const db = mongoose.connection;

//Define event listeners for databse connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
})

db.on('error', () => {
    console.log('MongoDB contion error');
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

//Export the databse connection

module.exports = db;