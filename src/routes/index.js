var express = require('express');
var router = express.Router();
var passport = require('passport');

const { body, check, validationResult } = require('express-validator');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const logAllRequests = require('../middleware/logAllRequests');

const contactService 			= require('../services/contactService');
const registrationService = require('../services/registrationService');

// router middleware
router.use(logAllRequests);
// router.use('/admin', ensureLoggedIn)

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
	(req, res, next) => {
		req.logout();
		console.log('successfully logged out');
		res.sendStatus(200)
});


//TODO nice to alias this as 'register' somewhere
router.post('/practitioner',
	[
		body('email', 'email is invalid').isEmail().normalizeEmail(),
		body('firstName', 'first name must be text').trim().isAlpha(),
		body('lastName', 'first name must be text').trim().isAlpha(),
		body('phoneNumber').isMobilePhone(),
		check('specialty').isIn(['reading', 'behavioral', 'speech']),
		body('specialty').toUpperCase(),
		body('yearsExperience').isInt({ min: 0, max: 100, allow_leading_zeroes: false }) //not sure this will allow '0'
	],
	function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    registrationService.createPractitioner(req.body)
			.then(p => {
			  res.json(p);
			})
		  .catch(err => {
				res.sendStatus(500).json({ errors: err.message });
			});
})


router.get('/admin',
 // ensureLoggedIn(),
	function(req, res) {
		res.send('this is a restricted area');
	}
)


router.get('/admin/contacts',
	//ensureLoggedIn(),
	function(req, res) {
		//TODO pass in the admin's id, so only their contact requests are delivered
		var response = [];
		contactService.list()
			.then(cs => {
				cs.forEach(function(c) {
					response.push({
						firstName: c.firstName,
						lastName:  c.lastName,
						email:     c.email,
						note:			 c.note
					});
				});
				res.json({ contacts: response });
			})
		  .catch(err => {
				res.sendStatus(500).json({ errors: err.message });
			});
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
    contactService.create(req.body)
			.then(c => {
				res.json(c);
			})
			.catch(err => {
				res.sendStatus(500).json({ errors: err.message });
			});
})

module.exports = router;
