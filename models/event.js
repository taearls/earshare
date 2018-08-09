const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
  attendingCount: Number,
  usersAttending: [{
    username: String,
    id: String
  }],
  event_id: String
});

module.exports = mongoose.model('Event', eventSchema);