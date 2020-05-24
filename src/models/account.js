var mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new mongoose.Schema({
  username: String,
	password: String
},	{ timestamps: true });

accountSchema.plugin(passportLocalMongoose);

exports.Account = mongoose.model('Account', accountSchema);
