module.exports = function ensureLoggedIn() {

  // a more api-centric version of connect-ensure-logged-in
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
			console.log('we are not authenticated')
      return res.sendStatus(403)
    }
		console.log('we are authenticated')
    next();
  }
}
