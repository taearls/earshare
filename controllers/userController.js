const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const Artist = require('../models/artist');
const Event = require('../models/event');
const bcrypt = require('bcrypt');


// get index route

router.get('/', async (req, res, next) => {
	try {
		// grab all users from database
		const allUsers = await User.find();
		res.render('user/index.ejs', {
			users: allUsers
		});
	} catch (err) {
		next(err);
	}
})

// get show route

router.get("/:id", async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id);
		const allArtists = await Artist.find();
		res.render('user/show.ejs', {
			user: foundUser,
			allArtists: allArtists
		})
	} catch (err) {
		next(err);
	}
})

// get edit route

router.get("/:id/edit", async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id);
		res.render("user/edit.ejs", {
			user: foundUser,
			index: foundUser.id
		});
	} catch (err) {
		next(err);
	}
})

// put route to update user info
router.put("/:id", async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

		const updatedArtists = await Artist.find();
		// find all artists who have a user with the same id as the band member id

		// have to declare this variable outside the loops
		let savedArtists;
		
		// since there are multiple usersWithAccess being returned in an array, we have to iterate through them
		// two for loops:

		for (let i = 0; i < updatedArtists.length; i++) {
			for (let j = 0; j < updatedArtists[i].usersWithAccess.length; j++) {
				console.log(updatedArtists[i].usersWithAccess[j].id);
				console.log(req.params.id, " this is req.params.id");
				if (updatedArtists[i].usersWithAccess[j].id === req.params.id) {
					updatedArtists[i].usersWithAccess[j].username = req.body.username;
					savedArtists = await updatedArtists[i].save();
				}
			}
		}
		res.redirect("/user");
	} catch (err) {
		next(err);
	}
})

// delete route to remove user info
router.delete("/:id", async (req, res, next) => {
	try {
		const deletedUser = await User.findByIdAndRemove(req.params.id);

		// WHEN WE CONNECT USER TO ARTIST AND EVENT:

		// check if all associated artists have no users remaining in usersWithAccess array if deletedUser is removed
		// if they don't have any usersWithAccess remaining, delete artist
		// if artist deleted, delete associated events too

		res.redirect("/user");
	} catch (err) {
		next(err);
	}
})




module.exports = router;
