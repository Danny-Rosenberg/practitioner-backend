var mongoose = require('mongoose');
var Contact = require('./contact.js');
var Account = require('./account.js');

var connectDb = () => {
	console.log('env db URL is: ' + process.env.DATABASE_URL);
	return mongoose.connect(process.env.DATABASE_URL);
};


module.exports = { Account, Contact, connectDb };
