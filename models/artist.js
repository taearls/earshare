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
  bandMembers: [{
    username: String,
    user_id: String
  }],
  usersWhoLike: [{
    username: String,
    user_id: String
  }],
  artist_id: String
});

module.exports = mongoose.model('Artist', artistSchema);