const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
      name: String,
      description: String,
      venue: String,
      date: Date,
      meta: {
          interested: Number,
          attending: Number
     }
});


//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('Event', eventSchema);
