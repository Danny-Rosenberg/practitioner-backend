const {Content} = require('../../src/models/practitioner');

exports.createContent = async function(body, practitioner) {

  var content = new Content({
	    practitioner:	practitioner,
		about:			 body.about,
		location:		 body.location,
		home:			 body.home
	});

	try {
		let res = await content.save();
		console.log('saved content');
		return res;
  } catch(err) {
    console.log('hit error saving content: ',  err);
    throw err;
  }
}
