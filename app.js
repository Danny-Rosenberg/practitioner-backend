const express = require('express');
var app = express();


const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

//setup routes
var routes = require('./src/routes/index');

//load .env values into process.env
require('dotenv').config()


const { Account, Contact, connectDb } = require('./src/models');


/* PASSPORT LOCAL AUTHENTICATION */

passport.use(Account.createStrategy());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//setup db
connectDb().then(async () => {
	//TODO add error handling this fails quietly
	if(process.env.ERASE_DB_ON_SYNC) {
		await Promise.all([
			Contact.deleteMany({}),
			Account.deleteMany({})
		]);
	}
	seedDb();
	app.listen(process.env.DB_PORT, () =>
		console.log("Practioner app listening on port: " + process.env.DB_PORT),
	);
});


const seedDb = async () => {
	contact = new Contact({
		firstName: 'honus',
		lastName: 'wagner',
		phoneNumber: '123-456-7890',
		email: 'dutch@aol.com',
		note: 'I need a good speech therapist',
		ackStatus: false
	});


	/* REGISTER SOME ACCOUNTS */
	Account.register({username:'peach', active: false}, 'peach');
	Account.register({username:'jiggly', active: false}, 'jiggly');

	await contact.save();

};


//setup routes
app.use('/', routes);


// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());


const port = process.env.PORT || 8000;
var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
