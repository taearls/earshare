require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path')


app.set('view engine', 'ejs')
require('./db/db');


// MIDDLEWARE
app.use(session({
	secret: 'this is a random string to open up hash',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false }
}))
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: false}));

app.get('/svg', (req, res) => {
	res.setHeader('Content-type', 'image/svg+xml');
	res.sendFile(path.join(__dirname, './public/images/logo-lrg.svg'))
})

app.use((req, res, next) => {
	// check where user is going using req.path
	// if we do artist/ and event/, someone could view artist and event index page without being logged in
	if (req.path.includes('artist/') || req.path.includes('event/') || req.path.includes('user/')){
		if (req.session.loggedIn) {
			next();
		} else {
			req.session.message = "You need to be logged in to do that.";
			res.redirect("/");
		}
	} else {
		// without this, the client won't continue
		next();
	}
})


// CONTROLLERS
const artistController = require('./controllers/artistController');
app.use('/artist', artistController);
const userController = require('./controllers/userController');
app.use('/user', userController);
const authController = require('./controllers/authController');
app.use('/', authController);
const eventController = require('./controllers/eventController');
app.use('/event', eventController);

// seeding data -- adding some data when you start development
app.get('/seed', (req, res) => {
	res.send('I just added some data for you');
})

app.listen(process.env.PORT || PORT, () => {
	console.log('Server is running on PORT: ' + PORT);
})
