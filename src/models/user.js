var mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new mongoose.Schema({
  email: String,
  password: String
},  { timestamps: true });

accountSchema.plugin(passportLocalMongoose, { usernameField : 'email' });


const userSchema = new mongoose.Schema({
	firstName: { type: String, trim: true, required: true, maxlength: 25 },
	lastName: { type: String, trim: true, required: true, maxlength: 30 },
	phoneNumber: { type: String, trim: true, required: true, maxlength: 15 },
	age: { type: Number, trim: true, required: false },
	account: [accountSchema]
}, { timestamps: true });


module.exports =
	{
		Account: mongoose.model('Account', accountSchema),
		User: 	 module.exports = mongoose.model('User', userSchema)
  }
