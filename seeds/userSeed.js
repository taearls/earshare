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
    password: '$2y$12$FJJk29CK2QtEV0TMW1EujeldkQC.cnOlDW9v8/rsX1AxsnIVJlMcG', // tboneearls
    avatar: 'https://www.facebook.com/photo.php?fbid=10206541228449135&l=427263d017',
    userConfirmed: true
  }),
  new User({
    username: 'tyler',
    email: 'tyler.a.earls@gmail.com',
    password: '$2y$12$gwAMYK9UKIgmEnMfUAbD2OfEAHHhLTUxV2BIqebqUw9kRm8fhqrYC', // tyler
    avatar: 'https://www.facebook.com/photo.php?fbid=10209366988851379&l=c8b2559072',
    userConfirmed: false
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