const mongoose = require('mongoose');

// heroku uses this connection string
const herokuString = process.env.MONGODB_URI;

// locally, use this connection string 
const localString = "mongodb://localhost:27017/earshare";

mongoose.connect(herokuString || localString, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
	console.log("mongoose connected to db");
})

mongoose.connection.on("error", (err) => {
	console.log("mongoose error: ", err);
})

mongoose.connection.on("disconnected", () => {
	console.log("mongoose disconnected");
})