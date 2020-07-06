var mongoose = require('mongoose');

const practicionerSchema = new mongoose.Schema({
  yearsExperience: String,
  speciality: { type: String, enum: ["BEHAVIORAL", "SPEECH", "READING"], default "nil" }
	state: { type: String, enum: ["REGISTERED", "CONFIRMED"], default "REGISTERED" }
},  { timestamps: true });

practicionerSchema.methods.confirmed? = function(p) {
	return this.state == "CONFIRMED";
};

module.exports = mongoose.model('Practicioner', practicionerSchema);
