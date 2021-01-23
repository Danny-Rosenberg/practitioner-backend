var Practitioner = require('../../src/models/practitioner');

exports.createPractitioner = (body) => {

  var practitioner = new Practitioner({
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
}
