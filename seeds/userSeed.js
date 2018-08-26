const mongoose = require('mongoose');
const User = require('../models/user');

// heroku uses this connection string
const herokuString = process.env.MONGODB_URI;

// locally, use this connection string 
const localString = "mongodb://localhost:27017/earshare";

mongoose.connect(herokuString || localString, { useNewUrlParser: true });

const seededUsers = [
  new User({
    username: 'tboneearls',
    email: 'tboneearls@gmail.com',
    password: '$2b$10$jthGk9yLigxOa/Ic55k8zev7mMN8GQTopOkFIblZKFD3ygp/o0N9S', // tboneearls
    avatar: 'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/17499154_10206541228449135_5610285631864985330_n.jpg?_nc_cat=0&oh=9dcaeba2a4afb8ac8a353d9c5d026a34&oe=5C36048E',
    userConfirmed: true,
    artists: [],
    artistsLiked: [],
    eventsAttending: []
  }),
  new User({
    username: 'tyler',
    email: 'tyler.a.earls@gmail.com',
    password: '$2b$10$Wp3SKJTi6WVFg2dKjbsPkuCBJLpwr9Ip4hYrfxtebuLia3c0gh5Hi', // tyler
    avatar: 'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/36733990_10209366988931381_4424548404940505088_o.jpg?_nc_cat=0&oh=69fb9f49fc28c1dfca7ab088c4832412&oe=5C328A65',
    userConfirmed: false,
    artists: [],
    artistsLiked: [],
    eventsAttending: []
  })
];

let userCount = 0;
for (let i = 0; i < seededUsers.length; i++) {

  seededUsers[i].save((e) => {
    userCount++;
    if (userCount == seededUsers.length) {
      exit();
    } else if (e) {
      console.log("user seed error: ", e);
    }
  });
  
}

const exit = () => {
  console.log("user seed complete");
  mongoose.disconnect();
}