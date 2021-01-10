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
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const { Contact, User, Account, Practitioner, connectDb } = require('./src/models');


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
			User.deleteMany({}), //will this also delete accounts?
			Account.deleteMany({}),
			Practitioner.deleteMany({})
		]);
	}

	seedDb()
	.then()
	.catch((err) => {
		console.log('hit an error seeding', err);
	});

	app.listen(process.env.DB_PORT, () =>
		console.log("Practioner app listening on port: " + process.env.DB_PORT),
	);
})
.catch((err) => {
	console.log('hit error on connectDB');
});


const seedDb = async () => {
	pract1 = new Practitioner({
		yearsExperience: '3',
		specialty: 'SPEECH',
		state: 'CONFIRMED'
	});

	contact = new Contact({
		firstName: 'honus',
		lastName: 'wagner',
		phoneNumber: '123-456-7890',
		email: 'dutch@aol.com',
		note: 'I need a good speech therapist',
		ackStatus: false,
		practitioner: pract1
	});

	contact_2 = new Contact({
		firstName: 'mister',
		lastName: 'snrub',
		phoneNumber: '999-456-7890',
		email: 'powerplant@hotmal.com',
		note: 'I like how Mr. Snrub thinks!',
		ackStatus: false,
		practitioner: pract1
	});

	/* REGISTER SOME ACCOUNTS */
	var peach = Account.register({email:'peach@aol.com', active: false}, 'peach');
	var jiggly = Account.register({email:'jiggly@aol.com', active: false}, 'jiggly');

	user = new User({
		firstName: 'star',
		lastName: 'burns',
		phoneNumber: '123-456-7890',
		age: 45,
		account: peach
	});

	await pract1.save();
	await contact.save();
	await contact_2.save();
	await user.save();
};


// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

// move this to a middleware directory, try with headers
function authChecker(req, res, next){
	if(req.user){
		res.loggedIn = true;
	}
	next();
}


app.use(authChecker);


//setup routes
app.use('/', routes);

const port = process.env.PORT || 8000;
var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
   
	console.log("Example app listening at http://%s:%s", host, port)
	console.log("client host: " + process.env.CLIENT_HOST)
})
