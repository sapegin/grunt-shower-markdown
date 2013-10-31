var fs = require('fs');
var assert = require('assert');

describe('grunt-shower-markdown', function() {
	it('Should compile Markdown to HTML.', function(done) {
		var actual = fs.readFileSync('test/tmp/index.html', 'utf8');
		var expected = fs.readFileSync('test/expected/index.html', 'utf8');
		assert.equal(expected, actual);

		done();
	});
});
