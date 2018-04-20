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
router.get('/new', (req, res) => {
  res.render('event/new.ejs')
});

//new event post route

router.post('/', async (req, res, next) => {
//need to use body-parser
//also, properties in schema and input form MUST MATCH

  try {
    const createdEvent = await Event.create(req.body);

    res.redirect('/event');

  } catch(err) {
    next(err)
  }
});


// get show route
router.get('/:id', async (req, res, next) => {
	try {
		const eventToUpdate = await Event.findById(req.params.id);
		res.render('event/show.ejs', {
			event : eventToUpdate
		});
	} catch (err) {
		next(err);
	}
})


// get edit route

router.get('/:id/edit', async (req, res, next) => {

	try {

		res.render('event/edit.ejs')

	} catch (err) {
		next(err);
	}
});


// put edit route
router.put("/:id", async (req, res, next) => {
	try {
		const eventEdit = {};
  		eventEdit.name= req.body.name;
   		eventEdit.genre = req.body.genre;
			eventEdit.location = req.body.location;
			eventEdit.website = req.body.website;
			eventEdit.imglink = req.body.imglink;

		const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body);

		res.redirect("/event");
	} catch (err) {
		next(err);
	}
})


//delete event route
//delete using the index of data in model
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedEvent = await Event.findByIdAndRemove(req.params.id,)
    res.redirect('/event');

  } catch(err) {
    next(err)
  }
});



module.exports = router;



module.exports = router;
