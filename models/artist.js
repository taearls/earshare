const mongoose = require('mongoose');
const Event = require('./event');
const User = require('./user');

const artistSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      genre: String,
      location: String,
      website: String,
      avatar: String,
      description: String,
      events: [{
        name: String,
        event_id: String
      }],
      usersWithAccess: [{
        username: String,
        user_id: String
      }],
      usersWhoLike: [{
        username: String,
        user_id: String
      }],
      artist_id: String
});


//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('Artist', artistSchema);
