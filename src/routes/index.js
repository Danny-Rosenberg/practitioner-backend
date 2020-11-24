var express = require('express');
var router = express.Router();
var passport = require('passport');

const { body, check, checkSchema, validationResult } = require('express-validator');
const connectEnsureLogin = require('connect-ensure-login');

const contactService 			= require('../services/contactService');
const registrationService = require('../services/registrationService');


router.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).end();
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.send("user successfully logged in!");
    });

  })(req, res, next);
});


router.get('/logout',
	connectEnsureLogin.ensureLoggedIn("http://localhost:3000"),
	(req, res, next) => {
	req.logout();
	console.log('successfully logged out');
	res.sendStatus(200)
});


var specialitySchema = {
  "speciality": {
    in: 'body',
    isIn: {
      options: [["psychology", "speech", "reading"]],
      errorMessage: "Invalid speciality"
    }
  }
}

//TODO nice to alias this as 'register' somewhere
router.post('/practitioner',
	[
	body('email', 'email is invalid').isEmail().normalizeEmail(),
	body('firstName', 'first name must be text').trim().isAlpha(),
	body('lastName', 'first name must be text').trim().isAlpha(),
	body('phoneNumber').isMobilePhone(),
	checkSchema(specialitySchema),
	body('yearsExperience').isInt({ min: 0, max: 100, allow_leading_zeroes: false }) //not sure this will allow '0'
	],

	function(req, res) {
		console.log("got a post request to /practitioner");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    console.log("got a post request to /practitioner");
   // var response = registrationService.createPracticioner(req.body);
    res.sendStatus(200);
	}
)


router.get('/admin',
  connectEnsureLogin.ensureLoggedIn(),
	function(req, res) {
		res.send('this is a restricted area');
	}
)


router.get('/admin/contact',
	function(req, res) {
	//TODO pass in the admin's id, so only their contact requests are delivered
  var response = contactService.list();
  res.send(response);
})


router.post('/contact',
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

module.exports = router;
