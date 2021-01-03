module.exports = function ensureLoggedIn(req, res, next) {

  // a more api-centric version of connect-ensure-logged-in
	if (!req.isAuthenticated || !req.isAuthenticated()) {
		console.log('we are not authenticated')
		return res.sendStatus(403)
	}
	console.log('we are authenticated')
	next();
}
