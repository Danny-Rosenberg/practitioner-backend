const mongoose = require('mongoose');
const factory = require('../factories');

let connection;
let db;

export const mochaGlobalSetup = async () => {
	connection = mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  db = mongoose.connection;
	console.log('db connected');
}


export const function mochaGlobalTeardown = async () => {
	await this.db.dropDatabase();
  await this.db.close();
	console.log('db dropped');
}
