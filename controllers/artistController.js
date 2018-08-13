const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Artist = require('../models/artist');
const User = require('../models/user');

const uniqueArray = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

// get index route
router.get('/', async (req, res, next) => {
	try {

		const allArtists = await Artist.find();
		const loggedIn = await req.session.loggedIn;
		const currentUser = await User.findOne({"username": req.session.username});
		res.render('artist/index.ejs', {
			artists: allArtists,
			loggedIn: loggedIn,
			currentUser: currentUser
		});

	} catch(err) {
		next(err);
	}
})

// new artist get route
router.get('/new', async (req, res, next) => {
	try {

		const allUsers = await User.find();
		const currentUser = await User.findOne({"username": req.session.username});

		res.render('artist/new.ejs', {
			users: allUsers,
			currentUser: currentUser
		})

	} catch(err) {
		next(err);
	}
});

// new artist post route

router.post('/', async (req, res, next) => {

  try {

 	  const bandMember = await User.findById(req.body.userId);
    const createdArtist = await Artist.create(req.body);

    // save id of artist in different property artist_id
    createdArtist.artist_id = createdArtist._id;

    // add user to the artist's users with access (basically band members)
    createdArtist.bandMembers.push({
      username: bandMember.username,
      user_id: bandMember.id
    });

    // add artist to the user's list of affiliated artists
    bandMember.artists.push({
    	name: createdArtist.name.toString(),
    	artist_id: createdArtist.id.toString()
    });

    const savedArtist = await createdArtist.save();
    const savedUser = await bandMember.save();

    res.redirect('/artist');

  } catch(err) {
    next(err)
  }
});


// route to add user to artist likes
router.get('/addUser/:userId/:artistId', async (req, res, next) => {
	try {
		const addedUser = await User.findOne({"username": req.session.username});
		const band = await Artist.findById(req.params.artistId);

		band.usersWhoLike.push({
			username: addedUser.username,
			user_id: addedUser.id // has to be addedUser.id because on the user model, there is no user_id property
		});
		// filter through the band.usersWhoLike array to eliminate duplicate users
    // CAN'T USE FILTER METHOD BECAUSE UNIQUE OBJECT IDS MAKE IT IMPOSSIBLE TO USE FILTER

		// create new object to store unique fans (since we're working with an array of objects)
		const uniqueFans = {};

		for ( let i = 0, len = band.usersWhoLike.length; i < len; i++ )
		    uniqueFans[band.usersWhoLike[i]['username']] = band.usersWhoLike[i];

		band.usersWhoLike = new Array();
		for ( let key in uniqueFans )
		    band.usersWhoLike.push(uniqueFans[key]);
  


		// console.log(uniqueFans, " this should be a list of users without duplicates");



		const savedBand = await band.save();

		// add like to user page
		addedUser.artistsLiked.push({
			name: band.name,
			artist_id: band.artist_id
		})

		// create empty object to store unique artists
		const uniqueArtists = {};


		// assign the values of the object uniqueArtists using a universal key
		for ( let i=0, len = addedUser.artistsLiked.length; i < len; i++ )
		    uniqueArtists[addedUser.artistsLiked[i]['name']] = addedUser.artistsLiked[i];

		// create a new array
		// push the values of uniqueArtist to this new array
		// since we made a new array,
		// we have to use artist_id to keep the original id
		addedUser.artistsLiked = new Array();
		for ( let key in uniqueArtists )
		    addedUser.artistsLiked.push(uniqueArtists[key]);


		const savedUser = await addedUser.save();

		res.redirect('/artist/' + req.params.artistId);
	} catch (err) {
		next(err);
	}
})


// route to add new member to artist
router.get('/:artistId/addUser/:userId', async (req, res, next) => {
	try {
		const addedUser = await User.findById(req.params.userId);
		const band = await Artist.findById(req.params.artistId);
		// find all events the band is a part of and give access to new band member
		const bandEvents = await Event.find({"hostArtists.id": req.params.artistId});



		// add new member to the band
		band.bandMembers.push(addedUser);

		// give access to new band member to all band events
		for (let i = 0; i < bandEvents.length; i++) {
			for (let j = 0; j < bandEvents[i].hostArtists.length; j++) {
				// check if artist id is the same as band
				if (band._id === bandEvents[i].hostArtists[j]._id) {
					bandEvents[i].hostArtists[j].bandMembers.push(addedUser);
				}
			}
		}


		const uniqueMembers = {};

		// iterate through all the members in the band and remove duplicates by
		// creating new object with only unique names passed into it

		for ( let i=0, len = band.bandMembers.length; i < len; i++ )
		    uniqueMembers[band.bandMembers[i]['username']] = band.bandMembers[i];

		band.bandMembers = new Array();
		for ( let key in uniqueMembers ) {
		    band.bandMembers.push(uniqueMembers[key]);
		}

		const savedBand = await band.save();

		// add band to user's affiliated artists

		addedUser.artists.push(band);

		const uniqueBands = {};

		// iterate through all the members in the band and remove duplicates by
		// creating new object with only unique names passed into it
		const origArtistId = [];
		for ( let i=0, len = addedUser.artists.length; i < len; i++ ) {
		    uniqueBands[addedUser.artists[i]['name']] = addedUser.artists[i];
		    addedUser.artists[i].artist_id = addedUser.artists[i].id;
		    origArtistId.push(addedUser.artists[i].artist_id);
		}


		// this mutates the id of the artist
		addedUser.artists = new Array();
		for ( let key in uniqueBands )
		    addedUser.artists.push(uniqueBands[key]);


		const savedUser = await addedUser.save();

		// redirect to artist show page using the artistId from the get route
		res.redirect('/artist/' + req.params.artistId);
	} catch (err) {
		next(err);
	}
})

// route to delete members from artist
router.get('/removeUser/:artistId/:userId', async (req, res, next) => {
	try {
		const deletedUser = await User.findById(req.params.userId);
		const band = await Artist.findById(req.params.artistId);

		// remove deletedUser from band members


		// make condition: if no band members are remaining, artist should be removed from db
		// otherwise, there would be no users with access to modify the artist

		if (band.bandMembers.length > 0) {
			band.bandMembers.remove(deletedUser);
			const savedBand = await band.save();


			// remove band from deletedUser's affiliated artist list
			deletedUser.artists.remove(band);

			// redirect to artist show page using the artistId from the get route
			res.redirect('/artist/' + req.params.artistId)


		}



	} catch (err) {
		next(err);
	}
})

// get show route
router.get('/:id', async (req, res, next) => {
	try {
		// this is the artist that is on the page
    // has to be req.params.id since that is the param being passed above
		const artist = await Artist.findById(req.params.id);
		const currentUser = await User.findOne({"username": req.session.username});
		// this should be the user Id of the users that are already in the band
		const userIds = [];

		// for each user with access, push each of their individual ids into the userIds array
		artist.bandMembers.forEach((user) => {
			userIds.push( user._id );
		})


		// the members in the band have an id in userIds,
		// non members do not have an id in userIds
		const bandMembers = await User.find({ "_id": { "$in": userIds} });
		const nonMembers = await User.find({ "_id": { "$nin": userIds } });
		const allUsers = await User.find();




		// console.log(nonMembers, " this should be a list of all users who aren't members of the band");
		// use this to keep track of current artist; on our site they have to go to the artist show page to create an event
		req.session.currentArtist = artist.name.toString();

		res.render('artist/show.ejs', {
			artist: artist,
			currentUser: currentUser,
			usersToAdd: nonMembers,
			bandMembers: bandMembers
		});
	} catch (err) {
		next(err);
	}
})


// get edit route

router.get('/:id/edit', async (req, res, next) => {

	try {
		const artistToUpdate = await Artist.findById(req.params.id);
		const currentUser = await User.findOne({"username": req.session.username});
		res.render('artist/edit.ejs', {
			artist: artistToUpdate,
			currentUser: currentUser
		})

	} catch (err) {
		next(err);
	}
});


// put edit route
router.put("/:id", async (req, res, next) => {
	try {
		const artistEdit = {};
  		artistEdit.name = req.body.name;
   		artistEdit.genre = req.body.genre;
  		artistEdit.location = req.body.location;
  		artistEdit.website = req.body.website;
  		artistEdit.img = req.body.img;
  		artistEdit.description = req.body.description;

		// find all users who have an artist with the same id as the artist
		const membersArtist = await User.find({"artists.id" : req.params.id});
		let savedUsers;


		// since there are multiple users being returned in an array, we have to iterate through them
		// we also have to iterate through each user's array of artists
		// so we need two for loops:

		for (let i = 0; i < membersArtist.length; i++) {
			for (let j = 0; j < membersArtist[i].artists.length; j++) {
				if (membersArtist[i].artists[j].id === req.params.id) {
					membersArtist[i].artists[j].name = req.body.name;
					savedUsers = await membersArtist[i].save();
				}
			}
		}

		const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body);
		const savedArtist = await updatedArtist.save();

		res.redirect("/artist");
	} catch (err) {
		next(err);
	}
})


//delete artist route
//delete using the index of data in model
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedArtist = await Artist.findByIdAndRemove(req.params.id);

    // remove associated events if no remaining host artists
    const allEvents = await Event.find();
    for (let i = 0; i < allEvents.length; i++) {
    	for (let j = 0; j < deletedArtist.events.length; j++) {
    		if (allEvents[i]._id.toString() === deletedArtist.events[j]._id.toString()) {
    			// remove in event show page if there are no more affiliated artists
    			allEvents[i].hostArtists.splice(deletedArtist.name.indexOf(), 1);
    			if (allEvents[i].hostArtists.length === 0) {
    				allEvents[i].remove();
    			}
    		}
    	}
    }

    // remove artist from all associated users
    const membersArtist = await User.find({"artists.artist_id" : req.params.id});
    let savedUsers;
    for (let i = 0; i < membersArtist.length; i++) {
    	for (let j = 0; j < membersArtist[i].artists.length; j++) {
    		if (membersArtist[i].artists[j].artist_id.toString() === req.params.id.toString()) {
    			membersArtist[i].artists[j].remove();
    			savedUsers = await membersArtist[i].save();
    		}
    	}
    }

    // remove artist info from all users who like them
    // find all the users who are fans of the artist we're deleting
    const fansArtist = await User.find({"artistsLiked.artist_id" : req.params.id})
    let savedFans;

    for (let i = 0; i < fansArtist.length; i++) {
    	for (let k = 0; k < fansArtist[i].artistsLiked.length; k++) {
	    	if (fansArtist[i].artistsLiked[k].id.toString() === req.params.id.toString()) {
	    		fansArtist[i].artistsLiked.remove(fansArtist[i].artistsLiked[k]);
		    	savedFans = await fansArtist[i].save();
	    	}
    	}
    }

    res.redirect('/artist');

  } catch(err) {
    next(err)
  }
});






module.exports = router;
