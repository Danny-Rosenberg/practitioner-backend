var mongoose = require('mongoose');

const practitionerSchema = new mongoose.Schema({
  yearsExperience: Number,
  speciality: { type: String, enum: ["BEHAVIORAL", "SPEECH", "READING", null], default: null },
  state: { type: String, enum: ["REGISTERED", "CONFIRMED"], default: "REGISTERED" },
},  { timestamps: true });

practitionerSchema.methods.isConfirmed = function(p) {
	return this.state == "CONFIRMED";
};

const contentSchema = new mongoose.Schema({
	about: String,
	location: String,
	home: String,
	practitioner: { type: mongoose.Schema.Types.ObjectId}
},	{timestamps: true });

module.exports =
	{
		Practitioner: mongoose.model('Practitioner', practitionerSchema),
		Content: 	    mongoose.model('Content', contentSchema)
  }
