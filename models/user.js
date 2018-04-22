const mongoose = require('mongoose');
const Artist = require('./artist.js')

const userSchema = new mongoose.Schema({
      username: String,
      password: String,
      email: String,
      avatar: String
      // artists: [Artist.schema]
});


//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('User', userSchema);
