var mongoose = require('mongoose');

var Contact = require('./contact.js');

const { User, Account }	= require('./user.js');

var connectDb = () => {
	console.log('env db URL is: ' + process.env.DATABASE_URL);
	return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};


module.exports = { User, Account, Contact, connectDb };
