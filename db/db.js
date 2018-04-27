const mongoose = require('mongoose');

const connectionString = process.env.DB_HOST;


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
