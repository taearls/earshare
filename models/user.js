const mongoose = require('mongoose');
const Artist = require('./artist');
const Event = require('./event.js')

// console.log(Artist); // returns an empty object

// since this model and the artist model both require each other,
// Artist appears here as an empty object.

const userSchema = new mongoose.Schema({
      username: String,
      password: String,
      email: String,
      avatar: String,
      // we have to push the name and id manually from the artist controller
      // instead of calling the whole schema
      artists: [{
      	name: String,
      	id: String
      }],
      artistsLiked: [{
<<<<<<< HEAD
        name: String,
        id: String
      }],
      eventsAttending: [{
        name: String,
        id: String
=======
            name: String,
            id: String
      }],
      eventsAttending: [{
            name: String,
            id: String
>>>>>>> 73fea67a5c61f19705a0894d00101ab06301527d
      }]
});

//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('User', userSchema);
