var Contact = require('../../src/models/contact')

exports.create = async function(body) {
  var contact = new Contact({
		firstName:	 body.firstName,
		lastName:		 body.lastName,
		email:			 body.email,
		phoneNumber: body.phoneNumber,
		age:				 body.age
	});

	try {
    let res = await contact.save();
    console.log('saved contact');
    return res;
  } catch(err) {
    console.log('hit error saving contact: ',  err);
    throw err;
  }
}


exports.list = () => {
	var res = Contact.getUnackedContacts();
	return res;
}
