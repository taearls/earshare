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
    avatar: 'https://amp.businessinsider.com/images/59e5d4a1b0c292755836e078-750-562.jpg',
    userConfirmed: true,
    artists: [],
    artistsLiked: [],
    eventsAttending: []
  }),
  new User({
    username: 'tyler',
    email: 'tyler.a.earls@gmail.com',
    password: '$2b$10$Wp3SKJTi6WVFg2dKjbsPkuCBJLpwr9Ip4hYrfxtebuLia3c0gh5Hi', // tyler
    avatar: 'https://data.whicdn.com/images/14922648/large.jpg',
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