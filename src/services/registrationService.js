const { Practitioner } = require('../../src/models/practitioner');

exports.createPractitioner = async function(body) {

  var practitioner = new Practitioner({
		firstName:			 body.firstName,
		lastName:				 body.lastName,
		email:					 body.email,
		password:				 body.password,
		phoneNumber:		 body.phoneNumber,
		speciality:			 body.specialty,
		yearsExperience: body.yearsExperience
	});

	try {
		let res = await practitioner.save();
		console.log('saved practitioner');
		return res;
  } catch(err) {
    console.log('hit error saving practitioner: ',  err);
    throw err;
  }
}
