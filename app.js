const express = require('express');
var app = express();
const { body, check, validationResult } = require('express-validator');
const contactService = require('./src/services/contactService');
var db = require('./src/models/index');

//setup db
db.connectDb().then(async () => {
	app.listen(process.env.PORT, () =>
		console.log("Practioner app listening on port ${process.env.PORT}"),
	);
});

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());


app.get('/', function (req, res) {
   res.send('Hello World');
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
		response = contactService.saveContact(req.body);
		res.send(response);
})


var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
