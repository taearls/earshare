const express = require ('express');
const router = express.Router();
const Event = require('../models/event');
const Artist = require('../models/artist');
const User = require('../models/user');

// get index route

router.get('/', async (req, res, next) => {
		try {
				const newArtist = await Artist.find();
				res.render('artist/index.ejs', {
					artist : newArtist
				});

		} catch(err) {
			next(err)
		}
})

// get edit route

router.get('/:id/edit', async (req, res, next) => {
	try {
		res.render('artist/edit.ejs');
	} catch (err) {
		next(err);
	}
})

// get show route

router.get('/:id', async (req, res, next) => {
	try {
		res.render('artist/show.ejs');
	} catch (err) {
		next(err);
	}
})

// get new route



module.exports = router;
