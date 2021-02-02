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
var seederService = require('./lib/seederService');


/* PASSPORT LOCAL AUTHENTICATION */

passport.use(Account.createStrategy());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//setup db
connectDb().then(async () => {
	//TODO add error handling this fails quietly
	seederService.seedDb()
	.then()
	.catch((err) => {
		console.log('hit an error seeding', err);
	});

	app.listen(process.env.DB_PORT, () =>
		console.log("Practioner app listening on port: " + process.env.DB_PORT),
	);
})
.catch((err) => {
	console.log(err);
	console.log('hit error on connectDB');
});



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
