const FactoryBot       = require('factory-bot');
const factory  				 = FactoryBot.factory;
const adapter          = new FactoryBot.MongooseAdapter();
const { Practitioner } = require('../../src/models/practitioner');

factory.setAdapter(adapter);

factory.define('Practitioner', Practitioner, (buildOptions) => {
	const attr = {
		//id: 						 factory.sequence('Practitioner.id'),
		yearsExperience: factory.chance('integer', ({ min: 0, max: 80 })),
		specialty: 			 'READING',
		state: 					 'REGISTERED'
	}
	if (buildOptions.state == 'confirmed' ) {
		attr['state'] = 'CONFIRMED';
	}
	return attr;
});

