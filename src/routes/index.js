var express = require('express');
var router = express.Router();

const { body, check, validationResult } = require('express-validator');
const contactService = require('../services/contactService');
const connectEnsureLogin = require('connect-ensure-login');

router.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login?info=' + info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });

  })(req, res, next);
});


router.get('/admin',
  connectEnsureLogin.ensureLoggedIn(),
	function(req, res) {
		res.send('this is a restricted area');
	}
)


router.get('/admin/contact', function(req, res) {
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
