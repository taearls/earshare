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
		res.render('artist/new.ejs', {
			users: allUsers
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


// get show route
router.get('/:id', async (req, res, next) => {
	try {
		const artistToUpdate = await Artist.findById(req.params.id);
		console.log(artistToUpdate, " this is the artist in get show route");
		res.render('artist/show.ejs', {
			artist : artistToUpdate
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
    const deletedArtist = await Artist.findByIdAndRemove(req.params.id,)
    res.redirect('/artist');

  } catch(err) {
    next(err)
  }
});



module.exports = router;
