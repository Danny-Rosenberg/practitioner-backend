var express = require('express');
var app = express();
const { body, check, validationResult } = require('express-validator');


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
		body('email', 'email is invalid').isEmail()
	],
	function(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		console.log("got a post request to /contact");
		res.send('hello contact ' + req.body.fullName)
})


var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
