const assert = require('assert');
const registrationService = require('../../src/services/registrationService');
const mongoose = require('mongoose');
const factory = require('../factories');

describe('Practitioner CRUD', () => {
	var connection = mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
	var db = mongoose.connection;

	after(async () => {
		await db.dropDatabase();
		await db.close();
	});

	it('creates a new practitioner', function(done) {
		factory.build('Practitioner').then(practitionerAttr => {
			registrationService.createPractitioner(practitionerAttr)
				.then(practitioner => {
					assert.equal(practitionerAttr.yearsExperience, practitioner.yearsExperience);
					done();
				})
				.catch(err => {
					done(err);
				});
		}).catch(err => {
			done(err);
		});;
	});

});
