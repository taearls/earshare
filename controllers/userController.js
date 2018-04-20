const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const Artist = require('../models/artist');
const Event = require('../models/event');
const bcrypt = require('bcrypt');


// get index route

router.get('/', async (req, res, next) => {
	try {
		res.render('index.ejs');
	} catch (err) {
		next(err);
	}
})

// get edit route

router.get('/:id/edit', async (req, res, next) => {
	try {
		res.render('edit.ejs');
	} catch (err) {
		next(err);
	}
})

// get show route

router.get('/:id', async (req, res, next) => {
	try {
		res.render('show.ejs');
	} catch (err) {
		next(err);
	}
})




module.exports = router;