const express = require ('express');
const router = express.Router();
const Event = require('../models/event');
const Artist = require('../models/artist');
const User = require('../models/user');





// get index route
router.get('/', async (req, res, next) => {
	try {
		const allArtists = await Artist.find();
		res.render('artist/index.ejs', {
			artists : allArtists
		});

	} catch(err) {
		next(err);
	}
})

//new artist get route
router.get('/new', async (req, res, next) => {
	try {
		const allUsers = await User.find();
		const user = await User.findOne({"username": req.session.username});
		console.log(req.session.username, " this is req.session.username");
		console.log(user, " this should be the current user")
		res.render('artist/new.ejs', {
			users: allUsers,
			currentUser: user
		})

	} catch(err) {
		next(err);
	}
});

//new artist post route

router.post('/', async (req, res, next) => {
//need to use body-parser
//also, properties in schema and input form MUST MATCH

  try {

 	const userArtist = await User.findById(req.body.userId);
    const createdArtist = await Artist.create(req.body);

    // add user to the artist's users with access (basically band members)
    createdArtist.usersWithAccess.push(userArtist);
    // add artist to the user's list of affiliated artists
    userArtist.artists.push({
    	name: createdArtist.name.toString(),
    	id: createdArtist.id.toString()
    });

    const savedArtist = await createdArtist.save();
    const savedUser = await userArtist.save();

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
			id: addedUser.id
		});
		// filter through the band.usersWhoLike array to eliminate duplicate users

		// create new object to store unique fans (since we're working with an array of objects)
		const uniqueFans = {};



		for ( let i=0, len = band.usersWhoLike.length; i < len; i++ )
		    uniqueFans[band.usersWhoLike[i]['username']] = band.usersWhoLike[i];

		band.usersWhoLike = new Array();
		for ( let key in uniqueFans )
		    band.usersWhoLike.push(uniqueFans[key]);
		
		// console.log(uniqueFans, " this should be a list of users without duplicates");



		const savedBand = await band.save();

		// add like to user page
		addedUser.artistsLiked.push({
			name: band.name,
			id: band.id
		})

		// filter through the addedUser.artistsLiked array to eliminate duplicate artists

		const uniqueArtists = {};


		 
		for ( let i=0, len = addedUser.artistsLiked.length; i < len; i++ )
		    uniqueArtists[addedUser.artistsLiked[i]['name']] = addedUser.artistsLiked[i];

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
		
		// add new member to the band
		band.usersWithAccess.push(addedUser);

		const uniqueMembers = {};

		// iterate through all the members in the band and remove duplicates by
		// creating new object with only unique names passed into it

		for ( let i=0, len = band.usersWithAccess.length; i < len; i++ )
		    uniqueMembers[band.usersWithAccess[i]['username']] = band.usersWithAccess[i];

		band.usersWithAccess = new Array();
		for ( let key in uniqueMembers )
		    band.usersWithAccess.push(uniqueMembers[key]);

		const savedBand = await band.save();

		// add band to user's affiliated artists

		addedUser.artists.push(band);

		const uniqueBands = {};

		// iterate through all the members in the band and remove duplicates by
		// creating new object with only unique names passed into it

		for ( let i=0, len = addedUser.artists.length; i < len; i++ )
		    uniqueBands[addedUser.artists[i]['name']] = addedUser.artists[i];

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

		if (band.usersWithAccess.length > 0) {
			band.usersWithAccess.remove(deletedUser);
			const savedBand = await band.save();


			// remove band from deletedUser's affiliated artist list

			deletedUser.artists.remove(band);
			const savedUser = await deletedUser.save();
			if (band.usersWithAccess.length === 0) {
				const deletedBand = await band.remove();
				// redirect to the artist index page instead so the browser doesn't throw an error
				res.redirect('/artist')
			} else {
				// redirect to artist show page using the artistId from the get route
				res.redirect('/artist/' + req.params.artistId)
			}
			
			
		}


		
	} catch (err) {
		next(err);
	}
})

// get show route
router.get('/:id', async (req, res, next) => {
	try {
		const artistToUpdate = await Artist.findById(req.params.id);
		const allUsers = await User.find();

		// use this to keep track of current artist; on our site they have to go to the artist show page to create an event
		req.session.currentArtist = artistToUpdate.name.toString();

		res.render('artist/show.ejs', {
			artist: artistToUpdate,
			users: allUsers
		});
	} catch (err) {
		next(err);
	}
})


// get edit route

router.get('/:id/edit', async (req, res, next) => {

	try {
		const artistToUpdate = await Artist.findById(req.params.id);
		res.render('artist/edit.ejs', {
			artist: artistToUpdate
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
		const usersArtist = await User.find({"artists.id" : req.params.id});
		let savedUsers;
		console.log(usersArtist, " this is usersArtist");


		// since there are multiple users being returned in an array, we have to iterate through them
		// we also have to iterate through each user's array of artists
		// so we need two for loops:

		for (let i = 0; i < usersArtist.length; i++) {
			for (let j = 0; j < usersArtist[i].artists.length; j++) {
				if (usersArtist[i].artists[j].id === req.params.id) {
					usersArtist[i].artists[j].name = req.body.name;
					savedUsers = await usersArtist[i].save();
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
    const usersArtist = await User.find({"artists.id" : req.params.id});
    let savedUsers;
    for (let i = 0; i < usersArtist.length; i++) {
    	for (let j = 0; j < usersArtist[i].artists.length; j++) {
    		if (usersArtist[i].artists[j].id.toString() === req.params.id.toString()) {
    			usersArtist[i].artists[j].remove();
    			savedUsers = await usersArtist[i].save();
    		}
    	}
    }

    res.redirect('/artist');

  } catch(err) {
    next(err)
  }
});



module.exports = router;
