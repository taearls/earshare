const mongoose = require('mongoose');
<<<<<<< HEAD


=======
>>>>>>> zoe
//attendee schema

const attendeeSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      email: String,
      password: String
});


//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('Attendee', attendeeSchema);
