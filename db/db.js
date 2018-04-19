const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/project2_musicapp';


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