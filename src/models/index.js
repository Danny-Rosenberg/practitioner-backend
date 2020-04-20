var mongoose = require('mongoose');

var Contact = require('./contact.js');

exports.connectDb = () => {
	console.log('env is: ' + process.env);
	return mongoose.connect('mongodb://localhost:27017/practicioner');
};

exports.Contact = { Contact };

