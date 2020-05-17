var mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	firstName: { type: String, trim: true, required: true, maxlength: 25 },
	lastName: { type: String, trim: true, required: true, maxlength: 30 },
	phoneNumber: { type: String, trim: true, required: true, maxlength: 15 },
	email: { type: String, trim: true, required: true, maxlength: 30, unique: true },
	note: { type: String, trim: true, default: '' },
	ackStatus: { type: Boolean, default: null }
}, { timestamps: true });


contactSchema.statics.findByEmail = async function(email) {
	let contact = await this.findOne({
		email: email
	});

	return contact;
};


contactSchema.statics.getUnackedContacts = async function(callback) {
	let contacts = await this.find({ ackStatus: false }, callback);
	return contacts;
};


exports.Contact = mongoose.model('Contact', contactSchema);
