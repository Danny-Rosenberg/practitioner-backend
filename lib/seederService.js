const { Contact, User, Account, Practitioner,Content, connectDb } = require('../src/models');

exports.seedDb = async function() {

	if(process.env.ERASE_DB_ON_SYNC) {
    await Promise.all([
      Contact.deleteMany({}),
      User.deleteMany({}), //will this also delete accounts?
      Account.deleteMany({}),
      Practitioner.deleteMany({}),
	  Content.deleteMany({}),
    ]);
  }

  pract1 = new Practitioner({
    yearsExperience: 3,
    specialty: 'SPEECH',
    state: 'CONFIRMED'
  });
  
	content1 = new Content({
		about: 'About myself',
		location: 'This is my location',
		home: 'This is my home',
		practitioner: pract1
	});

  contact = new Contact({
    firstName: 'honus',
    lastName: 'wagner',
    phoneNumber: '123-456-7890',
    email: 'dutch@aol.com',
    note: 'I need a good speech therapist',
    ackStatus: false,
    practitioner: pract1
  });

  contact_2 = new Contact({
    firstName: 'mister',
    lastName: 'snrub',
    phoneNumber: '999-456-7890',
    email: 'powerplant@hotmal.com',
    note: 'I like how Mr. Snrub thinks!',
    ackStatus: false,
    practitioner: pract1
  });

  /* REGISTER SOME ACCOUNTS */
  var peach = Account.register({email:'peach@aol.com', active: false}, 'peach');
  var jiggly = Account.register({email:'jiggly@aol.com', active: false}, 'jiggly');

  user = new User({
    firstName: 'star',
    lastName: 'burns',
    phoneNumber: '123-456-7890',
    age: 45,
    account: peach
  });

  await pract1.save();
  await content1.save();
  await contact.save();
  await contact_2.save();
  await user.save();
}
