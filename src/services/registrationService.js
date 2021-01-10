/*
var db = require('../../src/models/practitioner');
var Practicioner = db.Practicioner;

exports.createPractitioner = (body) => {

  var contact = new Practitioner({
		firstName:			 body.firstName,
		lastName:				 body.lastName,
		email:					 body.email,
		password:				 body.password,
		phoneNumber:		 body.phoneNumber,
		speciality:			 body.specialty,
		yearsExperience: body.yearsExperience
	});

	var res = practitioner.save(function (err, practitioner) {
		if (err) {
			console.log('hit an error in the practitioner save');
			console.log(err.message);
			return err.message;
		}
		console.log('practitioner saved to db: ' + practitioner.email);
		return practitioner;
	});
	return res;
} */
