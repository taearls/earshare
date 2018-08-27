const mongoose = require('mongoose');
const User = require('../models/user');
const Artist = require('../models/artist');

// heroku uses this connection string
const herokuString = process.env.MONGODB_URI;

// locally, use this connection string 
const localString = "mongodb://localhost:27017/earshare";

mongoose.connect(herokuString || localString, { useNewUrlParser: true });

const seedArtists = async () => {
  // grab seeded users
  const user1 = await User.findOne({username: 'tboneearls'});
  const user2 = await User.findOne({username: 'tyler'});
  const seededArtists = [
    new Artist({
      name: 'Cuckoo and the Birds',
      genre: 'Rock',
      location: 'Chicago, IL',
      website: 'www.facebook.com/cuckooandthebirds',
      avatar: 'https://scontent-ort2-1.xx.fbcdn.net/v/t31.0-8/27500149_2011774789041241_7136954156686171001_o.jpg?_nc_cat=0&oh=79cae2f9ed2aa1d04f787fe6fe3bb64a&oe=5C0B600F',
      description: "For now, it's just one guy playing guitar in his bedroom. Soon to be a full band.",
      bandMembers: {
        username: user1.username.toString(),
        user_id: user1.id.toString()
      },
      usersWhoLike: {
        username: user1.username.toString(),
        user_id: user1.id.toString()
      }
    }),
    new Artist({
      name: 'What About This',
      genre: 'Rock',
      location: 'Chicago, IL',
      website: 'www.facebook.com/whataboutthisband',
      avatar: 'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/33199062_452847725159045_7614513043375915008_o.jpg?_nc_cat=0&oh=62778cd4f5c5a8eddcac640db588e772&oe=5BF916DC',
      description: 'Three dudes rocking out.',
      bandMembers: {
        username: user2.username.toString(),
        user_id: user2.id.toString()
      },
      usersWhoLike: {
        username: user2.username.toString(),
        user_id: user2.id.toString()
      }    
    })
  ];
  let artistCount = 0;
  for (let i = 0; i < seededArtists.length; i++) {
    seededArtists[i].save((e) => {

      artistCount++;
      if (artistCount == seededArtists.length) {        
        exit();
      } else if (e) {
        console.log("artist seed error: ", e);
      }

    });
  }
}

seedArtists();

const exit = () => {
  console.log("artist seed complete");
  mongoose.disconnect();
}