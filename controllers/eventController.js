const express = require ('express');
const router = express.Router();
const Event = require('../models/event');
const Artist = require('../models/artist');
const User = require('../models/user');

// get index route

router.get('/', async (req, res, next) => {
	try {
		const allEvents = await Event.find();
		res.render('event/index.ejs', {
			events : allEvents
		});

	} catch(err) {
		next(err)
	}
})

//new event get route
router.get('/new', async (req, res, next) => {
	try {
		const allArtists = await Artist.find();
		const artist = await Artist.findOne({"name": req.session.currentArtist});
		// console.log(artist, " this is artist being sent to the event new page");
		res.render('event/new.ejs', {
			artists: allArtists,
			currentArtist: artist
		})
	} catch (err) {
		next(err);
	}
});


// route to add user attendance to event page

router.get('/:eventId/addUser/:userId', async (req, res, next) => {
	try {
		const addedUser = await User.findOne({"username": req.session.username});

		const event = await Event.findById(req.params.eventId);

		// add the user to the event model so we can show it on event page
		event.usersAttending.push({
			username: addedUser.username,
			id: addedUser.id
		});

		
		//add attendance to event Page
		const savedEvent = await event.save();

		// add the event to the user model so we can show it on user page
		addedUser.eventsAttending.push({
			name: event.name,
			id: event.id
		});
		const savedUser = await addedUser.save();

		res.redirect('/event/' + req.params.eventId);

	} catch (err) {
		next(err);
	}
})






//new event post route

router.post('/', async (req, res, next) => {
//need to use body-parser
//also, properties in schema and input form MUST MATCH
  try {
  	const artistHost = await Artist.findById(req.body.artistId)
    const createdEvent = await Event.create(req.body);
    // this will populate the "affiliated artists"
    createdEvent.hostArtists.push({
    	name: artistHost.name.toString(),
    	id: artistHost.id.toString()
    });
    const savedEvent = await createdEvent.save();

    // this will make the event show up in the artist schema
    artistHost.events.push(createdEvent);
	const savedArtist = await artistHost.save();
    res.redirect('/event');

  } catch(err) {
    next(err);
  }
});


// get show route
router.get('/:id', async (req, res, next) => {
	try {
		const allUsers = await User.find();
		const eventToUpdate = await Event.findById(req.params.id);
		res.render('event/show.ejs', {
			users: allUsers,
			event: eventToUpdate
		});
	} catch (err) {
		next(err);
	}
});


// get edit route

router.get('/:id/edit', async (req, res, next) => {
	try {
		const eventToUpdate = await Event.findById(req.params.id);
		res.render('event/edit.ejs', {
				event : eventToUpdate
		});
	} catch (err) {
		next(err);
	}
});


// put edit route
router.put("/:id", async (req, res, next) => {
	try {
		const eventEdit = {};
  		eventEdit.name = req.body.name;
   		eventEdit.genre = req.body.genre;
			eventEdit.location = req.body.location;
			eventEdit.website = req.body.website;
			eventEdit.img = req.body.img;
			eventEdit.description = req.body.description;

		const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body);

		// find all artists who have an event with the same id as the event being changed
		const hostArtists = await Artist.find();
		let savedArtists;

		// since there are multiple artists being returned in an array, we have to iterate through them
		// we also have to iterate through each artists's array of events
		// so we need two for loops:


		for (let i = 0; i < hostArtists.length; i++) {
			for (let j = 0; j < hostArtists[i].events.length; j++) {
				if (hostArtists[i].events[j]._id.toString() === req.params.id.toString()) {
					// update all the keys of the object in the event array
					hostArtists[i].events[j].name = req.body.name;
					hostArtists[i].events[j].genre = req.body.genre;
					hostArtists[i].events[j].location = req.body.location;
					hostArtists[i].events[j].website = req.body.website;
					hostArtists[i].events[j].img = req.body.img;
					hostArtists[i].events[j].description = req.body.description;

					savedArtists = await hostArtists[i].save();
				}
			}
		}


		const savedEvent = await updatedEvent.save();


		res.redirect("/event");
	} catch (err) {
		next(err);
	}
});


//delete event route
//delete using the index of data in model
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedEvent = await Event.findByIdAndRemove(req.params.id);
    const allArtists = await Artist.find();
    let savedArtists;
    for (let i = 0; i < allArtists.length; i++) {
    	for (let j = 0; j < allArtists[i].events.length; j++) {
    		if (allArtists[i].events[j]._id.toString() === req.params.id.toString()) {
    			allArtists[i].events.splice(j, 1);
    			savedArtists = await allArtists[i].save();
    		}
    	}
    }

    res.redirect('/event');

  } catch(err) {
    next(err);
  }
});

module.exports = router;
