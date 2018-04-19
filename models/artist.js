const mongoose = require('mongoose');
const Event = require('./event.js')

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
      events: [Event.schema]
});


//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('Artist', artistSchema);
