const mongoose = require('mongoose');
const Artist = require('./artist');
const Event = require('./event')

// since this model and the artist model both require each other,
// Artist appears here as an empty object.

const userSchema = new mongoose.Schema({
      username: String,
      password: String,
      email: String,
      avatar: String,
      artists: [{
      	name: String,
      	artist_id: String
      }],
      artistsLiked: [{
        name: String,
        artist_id: String
      }],
      eventsAttending: [{
        name: String,
        event_id: String
      }]
});

//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('User', userSchema);
