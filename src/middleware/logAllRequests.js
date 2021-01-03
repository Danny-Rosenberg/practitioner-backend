module.exports = function logAllRequests(req, res, next) {
	console.log('request received to:', req.originalUrl);
	next();
}
