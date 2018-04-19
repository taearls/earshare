const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      username: String,
      password: String,
      email: String
});


//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('User', userSchema);