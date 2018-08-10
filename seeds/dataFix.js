const mongoose = require('mongoose');
const User = require('../models/user');
const Artist = require('../models/artist');
const Event = require('../models/event');

// heroku uses this connection string
const herokuString = process.env.MONGODB_URI;

// locally, use this connection string 
const localString = "mongodb://localhost:27017/earshare";

mongoose.connect(herokuString || localString, { useNewUrlParser: true });

const dataFix = async () => {
  // grab all the seeded data
  const seededUsers = await User.find();
  const seededArtists = await Artist.find();
  const seededEvents = await Event.find();

  const artist1ID = await seededArtists[0]._id.toString();
  const artist2ID = await seededArtists[1]._id.toString();
  console.log(artist1ID, " this is the first artist id");
  console.log(seededArtists[0].artist_id, " this should be the same ^^")

  seededArtists[0].artist_id = artist1ID;
  seededArtists[1].artist_id = artist2ID;

  const event1ID = await seededEvents[0]._id.toString();
  const event2ID = await seededEvents[1]._id.toString();

  seededEvents[0].event_id = event1ID;
  seededEvents[1].event_id = event2ID;

  // modify associated user info with artist information
  seededUsers[0].artists.push({
    name: seededArtists[0].name,
    artist_id: seededArtists[0].artist_id
  });
  seededUsers[1].artists.push({
    name: seededArtists[1].name,
    artist_id: seededArtists[1].artist_id
  });
  seededUsers[0].artistsLiked.push({
    name: seededArtists[0].name,
    artist_id: seededArtists[0].artist_id
  });
  seededUsers[1].artistsLiked.push({
    name: seededArtists[1].name,
    artist_id: seededArtists[1].artist_id
  });

  // modify associated user info with event information
  seededUsers[0].eventsAttending.push({
    name: seededEvents[0].name,
    event_id: seededEvents[0].event_id
  });
  seededUsers[1].eventsAttending.push({
    name: seededEvents[1].name,
    event_id: seededEvents[1].event_id
  });

  // modify associated artist info with event information
  seededArtists[0].events.push({
    name: seededEvents[0].name,
    event_id: seededEvents[0].event_id
  });
  seededArtists[1].events.push({
    name: seededEvents[1].name,
    event_id: seededEvents[1].event_id
  });

}


const exit = async () => {
  console.log("data fix complete");

  // grab all the seeded data
  const seededUsers = await User.find();
  const seededArtists = await Artist.find();
  const seededEvents = await Event.find();

  // return the data in the console
  console.log("here are the seeded Users:");
  console.log(seededUsers);
  console.log("---------------------------");
  console.log("here are the seeded Artists:");
  console.log(seededArtists);
  console.log("---------------------------");
  console.log("here are the seeded Events:");
  console.log(seededEvents);

  mongoose.disconnect();
}

dataFix();

exit();
