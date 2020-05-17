var mongoose = require('mongoose');

var Contact = require('./contact.js');

exports.connectDb = () => {
	console.log('env db URL is: ' + process.env.DATABASE_URL);
	return mongoose.connect(process.env.DATABASE_URL);
};


exports.Models = { Contact };
