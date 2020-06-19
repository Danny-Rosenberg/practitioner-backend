var mongoose = require('mongoose');

const practicionerSchema = new mongoose.Schema({
  yearsExperience: String,
  speciality: { type: String, enum: ["BEHAVIORAL", "SPEECH", "READING"], default "nil" }
},  { timestamps: true });

module.exports = mongoose.model('Practicioner', practicionerSchema);
