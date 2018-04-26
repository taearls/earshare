const mongoose = require('mongoose');
const Event = require('./event.js');
const User = require('./user.js');

const artistSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      genre: String,
      location: String,
      website: String,
      img: String,
      description: String,
      events: [{
        name: String,
        id: String
      }],
      usersWithAccess: [User.schema],
      usersWhoLike: [{
        username: String,
        id: String
      }],
      artist_id: String
});


//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('Artist', artistSchema);
