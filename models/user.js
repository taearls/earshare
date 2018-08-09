const mongoose = require('mongoose');
const Artist = require('./artist');
const Event = require('./event');

const userSchema = new mongoose.Schema({
      username: { 
        type: String, 
        required: true, 
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      resetPasswordToken: String,
      resetPasswordExpires: Date,
      userConfirmed: {
        type: Boolean,
        default: false
      },
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

module.exports = mongoose.model('User', userSchema);