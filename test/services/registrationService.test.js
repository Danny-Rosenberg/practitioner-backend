const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
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


	describe('without a speciality specified', () => {
		it('defaults to null', function(done) {
			factory.build('Practitioner', {speciality: undefined} ).then(practitionerAttr => {
				registrationService.createPractitioner(practitionerAttr)
					.then(practitioner => {
						assert.equal(practitionerAttr.speciality, null);
						done();
					}).catch(err => {
							done(err);
				  });
			})
		})
	});


	describe('without a state specified', () => {
		it('defaults to REGISTERED', function(done) {
			factory.build('Practitioner', {state: undefined}).then(practitionerAttr => {
				registrationService.createPractitioner(practitionerAttr)
					.then(practitioner => {
						assert.equal(practitionerAttr.state, 'REGISTERED');
						done();
					}).catch(err => {
							done(err);
				  });
			})
		})
	});
});
