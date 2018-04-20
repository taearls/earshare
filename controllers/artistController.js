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
			next(err)
		}
})

//new artist get route
router.get('/new', (req, res) => {
  res.render('artist/new.ejs')
});

//new artist post route

router.post('/', async (req, res, next) => {
//need to use body-parser
//also, properties in schema and input form MUST MATCH

  try {
    const createdArtist = await Artist.create(req.body);

    res.redirect('/artist');

  } catch(err) {
    next(err)
  }
});



// get show route
router.get('/:id', async (req, res, next) => {
	try {
		res.render('artist/show.ejs');
	} catch (err) {
		next(err);
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


// put edit route
router.put("/:id", async (req, res, next) => {
	try {
		// const artistEdit = {};
  // 		artistEdit.name= req.body.name;
  //  		artistEdit.genre = req.body.genre;
		// artistEdit.location = req.body.location;
		// artistEdit.website = req.body.website;
		// artistEdit.imglink = req.body.imglink;

		const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body);

		res.redirect("/artist");
	} catch (err) {
		next(err);
	}
})







module.exports = router;
