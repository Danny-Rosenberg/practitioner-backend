const express = require('express');
var app = express();

//load .env values into process.env
require('dotenv').config()


const { body, check, validationResult } = require('express-validator');
const contactService = require('./src/services/contactService');
var db = require('./src/models/index');
var models = require('./src/models');

const eraseDatabaseOnSync = true
//setup db
db.connectDb().then(async () => {
	if(eraseDatabaseOnSync) {
		await Promise.all([
			models.Models.Contact.Contact.deleteMany({})
		]);
	}
	seedDb();
	app.listen(process.env.DB_PORT, () =>
		console.log("Practioner app listening on port: " + process.env.DB_PORT),
	);
});


const seedDb = async () => {
	contact = new models.Models.Contact.Contact({
		firstName: 'honus',
		lastName: 'wagner',
		phoneNumber: '123-456-7890',
		email: 'dutch@aol.com',
		note: 'I need a good speech therapist',
		ackStatus: false
	});

	await contact.save();

};

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());


app.get('/admin/contact', function(req, res) {
	var response = contactService.list();
	res.send(response);
})


app.post('/contact',
	[
		body('email', 'email is invalid').isEmail().normalizeEmail(),
		body('firstName', 'first name must be text').trim().isAlpha(),
		body('lastName', 'first name must be text').trim().isAlpha(),
		body('age', 'must be a valid age').isInt({ min: 1, max: 120, allow_leading_zeroes: false }),
		body('phoneNumber').isMobilePhone()
	],
	function(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		console.log("got a post request to /contact");
		var response = contactService.create(req.body);
		res.send(response);
})


var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
