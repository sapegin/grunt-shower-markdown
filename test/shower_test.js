var fs = require('fs');

exports.shower = {
	compile: function(test) {
		'use strict';

		test.expect(1);

		var actual = fs.readFileSync('test/tmp/index.html', 'utf8');
		var expected = fs.readFileSync('test/expected/index.html', 'utf8');
		test.equal(expected, actual, 'Should compile Markdown to HTML.');

		test.done();
	}
};