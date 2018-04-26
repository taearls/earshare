const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
      name: String,
      venue: String,
      date: {
      	type: String,
      	default: Date.now()
      },
      description: String,
      img: String,
      hostArtists: [{
          name: String,
          artist_id: String
      }],
      meta: {
          attending: Number
     },
     usersAttending: [{
       username: String,
       id: String
     }]
});


//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('Event', eventSchema);
