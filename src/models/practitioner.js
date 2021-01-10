var mongoose = require('mongoose');

const practitionerSchema = new mongoose.Schema({
  yearsExperience: String,
  speciality: { type: String, enum: ["BEHAVIORAL", "SPEECH", "READING", null], default: null },
	state: { type: String, enum: ["REGISTERED", "CONFIRMED"], default: "REGISTERED" }
},  { timestamps: true });

practitionerSchema.methods.isConfirmed = function(p) {
	return this.state == "CONFIRMED";
};

module.exports = mongoose.model('Practitioner', practitionerSchema);
