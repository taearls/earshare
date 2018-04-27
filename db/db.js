const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;


mongoose.connect(connectionString);

mongoose.connection.on("connected", () => {
	console.log("mongoose connected to db");
})

mongoose.connection.on("error", (err) => {
	console.log("mongoose error: ", err);
})

mongoose.connection.on("disconnected", () => {
	console.log("mongoose disconnected");
})
