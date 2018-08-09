const mongoose = require('mongoose');
const User = require('../models/user');
const Artist = require('../models/artist');
const Event = require('../models/event');

// heroku uses this connection string
const herokuString = process.env.MONGODB_URI;

// locally, use this connection string 
const localString = "mongodb://localhost:27017/earshare";

mongoose.connect(herokuString || localString, { useNewUrlParser: true });

const seedEvents = async () => {
  // grab seeded users
  const user1 = await User.findOne({username: 'tboneearls'});
  const user2 = await User.findOne({username: 'tyler'});
  // grab seeded artists
  const artist1 = await Artist.findOne({name: 'Cuckoo and the Birds'});
  const artist2 = await Artist.findOne({name: 'What About This'});
  
  const seededEvents = [
    new Event({
      name: 'Open Mic Night',
      venue: 'Four Shadows',
      date: 'Saturday, August 18th',
      description: 'Cuckoo and the Birds, aka Tyler Earls, will be playing some new songs at an open mic event.',
      img: 'http://3.bp.blogspot.com/-QBrNYomxrPk/UUNubl26NcI/AAAAAAAAAJw/dtA-ig9qCvw/s1600/U04M2XaYOiyDqG_7SQL1d8SG3Q-JEMMx12AoI0FToIA.jpg',
      usersAttending: {
        username: user1.username.toString(),
        user_id: user1.id.toString()
      },
      hostArtists: {
        name: artist1.name.toString(),
        artist_id: artist1.id.toString()
      }
    }),
    new Event({
      name: 'What About This plays at The Owl',
      venue: 'The Owl',
      date: 'Thursday, August 30th',
      description: "What About This plays with some local Chicago bands at The Owl. You won't want to miss this!",
      img: 'https://scontent.cdninstagram.com/vp/a60d4f1c797ef15f226ec7c4362a5528/5C0784C8/t51.2885-15/sh0.08/e35/s640x640/18161632_101512290419373_9120419201163460608_n.jpg',
      usersAttending: {
        username: user2.username.toString(),
        user_id: user2.id.toString()
      },
      hostArtists: {
        name: artist2.name.toString(),
        artist_id: artist2.id.toString()
      }
    })
  ];
  let eventCount = 0;

  for (let i = 0; i < seededEvents.length; i++) {
    seededEvents[i].save((e) => {

      eventCount++;

      if (eventCount == seededEvents.length) {
        exit();
      } else if (e) {
        console.log("event seed error: ", e);
      }
    });
  }
}

seedEvents();

const exit = async () => {
  console.log("event seed complete");
  mongoose.disconnect();
}