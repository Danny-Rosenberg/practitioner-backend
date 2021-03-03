const FactoryBot       = require('factory-bot');
const factory  		   = FactoryBot.factory;
const adapter          = new FactoryBot.MongooseAdapter();
const { Content } = require('../../src/models/practitioner');

factory.setAdapter(adapter);

factory.create('Practitioner');

factory.define('Content', Content, (buildOptions) => {
	const attr = {
		about: 				factory.chance('paragraph'),
		location:           factory.chance('city'),
		home:				factory.chance('address'),
		practitioner:		factory.build('Practitioner')
	}
	if (buildOptions.practitioner == 'confirmed' ) {
		attr['practitioner'] = 'CONFIRMED';
	}
	return attr;
});