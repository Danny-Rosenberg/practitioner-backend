/*
var db = require('../../src/models/practicioner');
var Practicioner = db.Practicioner;

exports.createPracticioner = (body) => {

  var contact = new Practicioner({
		firstName:			 body.firstName,
		lastName:				 body.lastName,
		email:					 body.email,
		phoneNumber:		 body.phoneNumber,
		speciality:			 body.specialty,
		yearsExperience: body.yearsExperience
	});

	var res = practicioner.save(function (err, practicioner) {
		if (err) {
			console.log('hit an error in the practicioner save');
			console.log(err.message);
			return err.message;
		}
		console.log('practicioner saved to db: ' + practicioner.email);
		return practicioner;
	});
	return res;
} */
