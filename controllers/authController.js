const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Artist = require('../models/artist')
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
	const message = req.session.message;
	req.session.message = null;
	res.render('auth/home.ejs', {
		message: message
	});
})

// ********USER LOGIN******

router.post('/login', async (req, res, next) => {

	try {
		// find the user
		const user = await User.findOne({username: req.body.username});
		// if the user is not in the database, it will return null
		if (user) {
			// if user is found
			// now we need to compare the passwords
			// bcrypt.compareSync returns true or false
			if (bcrypt.compareSync(req.body.password, user.password)) {
				req.session.loggedIn = true;
				req.session.username = user.username;
				res.redirect('/user');
			} else {
				// if user password doesn't match input
				req.session.message = "Username or password is incorrect. Please try again.";
				res.redirect('/');
			}
		} else {
			// if user isn't found
			req.session.message = "Username or password is incorrect. Please try again.";
			res.redirect('/');
		}
	} catch (err) {
		next(err)
	}
})

// *****USER REGISTER*****

// if a user registers as an artist, we want to update the user profile with that information
// the user show page will then have a link that goes to the artist show page

router.post('/register', async (req, res, next) => {

	// first thing to do is hash the password

	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const newUser = ({
		username: req.body.username,
		password: passwordHash,
		email: req.body.email
	})
	try {
		const foundUser = await User.findOne({username: req.body.username})

		// // if the user was successfully created, let's create the session for that user
		// // check if name submitted already exists in the database
		if (foundUser == null) {
			// if user doesn't already exist, create newUser
			const user = await User.create(newUser);
			if (user) {
				req.session.loggedIn = true;
				req.session.username = user.username;
				res.redirect('/user');
			} else {
				req.sesson.message = "Sorry, registration was unsuccessful. Please try again.";
				res.redirect('/');
			}
		} else {
			// if user exists, send message and redirect to login page
			req.session.message = "User already exists.";
			res.redirect('/');
		}
	} catch (err) {
		next(err);
	}

})

module.exports = router;
