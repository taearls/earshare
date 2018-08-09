const mongoose = require('mongoose');
const User = require('../models/user');
const Artist = require('../models/artist');
const Event = require('../models/event');

// heroku uses this connection string
const herokuString = process.env.MONGODB_URI;

// locally, use this connection string 
const localString = "mongodb://localhost:27017/earshare";

mongoose.connect(herokuString || localString, { useNewUrlParser: true });

const seededEvents = [
  new Event({
    name: '',
    venue: '',
    date: '',
    description: '',
    img: ''
  }),
  new Event({
    name: '',
    venue: '',
    date: '',
    description: '',
    img: '',
    hostArtists: '',
    attendingCount: '',
    usersAttending: '',
    event_id: '' 
  })
];

let eventCount = 0;

for (let i = 0; i < seededEvents.length; i++) {
  seededEvents[i].save((e) => {
    eventCount++;
    if (eventCount == seededEvents.length) {
      exit();
    }
  })
}

function exit() {
  mongoose.disconnect();
  console.log("event seed complete");
}