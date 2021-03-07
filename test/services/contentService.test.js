const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const contentService = require('../../src/services/contentService');
const mongoose = require('mongoose');
const factory = require('../factories');

describe('Practitioner CRUD', () => {
	var connection = mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
	var db = mongoose.connection;

	after(async () => {
		await db.dropDatabase();
		await db.close();
	});

	it('creates a new content, populates about', function(done) {
		factory.build('Content').then(contentAttr => {
			contentService.createContent(contentAttr)
				.then(content => {
					assert.equal(contentAttr.about, content.about);
					done();
				})
				.catch(err => {
					done(err);
				});
		}).catch(err => {
			done(err);
		});;
	});
	
	it('creates a new content, populates practitioner', function(done) {
		const practitioner = factory.create('Practitioner').then(practitioner => {
		console.log(practitioner)}).then(practitioner => {
			factory.build('Content').then(contentAttr => {
				contentService.createContent(contentAttr, practitioner)
					.then(content => {
						console.log(contentAttr)
						console.log(content)
						assert.notEqual(content.practitioner, null)
						done();
					})
					.catch(err => {
						done(err);
					});
			}).catch(err => {
				done(err);
			})
		});
	});



});
