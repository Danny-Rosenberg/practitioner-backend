var db = require('../../src/models/contact');
var Contact = db.Contact;

exports.create = (body) => {

  var contact = new Contact({
		firstName:	 body.firstName,
		lastName:		 body.lastName,
		email:			 body.email,
		phoneNumber: body.phoneNumber,
		age:				 body.age
	});

	var res = contact.save(function (err, contact) {
		if (err) {
			console.log('hit an error in the contact save');
			console.log(err.message);
			return err.message;
		}
		console.log('contact saved to db: ' + contact.email);
		return contact;
	});
	return res;
}


exports.list = () => {
	debugger;
	var res = Contact.getUnackedContacts(function (err, contacts) {
		if(err) {
			console.log('hit error while finding unacked contacts');
			return err.message;
		}
		return contacts	
	});
	return res;
}
