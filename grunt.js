/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		lint: {
			files: [
				'tasks/shower-markdown.js',
				'grunt.js'
			]
		},
		shower: {
			index: {
				src: 'test/src/index.md',
				dest: 'test/tmp/index.html',
				styles: 'test/src/styles.css'
			}
		},
		test: {
			tasks: ['test/*_test.js']
		},
		jshint: {
			options: {
				node: true,
				white: false,
				smarttabs: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				undef: true
			}
		}
	});

	grunt.loadTasks('tasks');

	var fs = require('fs');
	grunt.registerTask('clean', 'Remove temporary files.', function() {
		try { fs.unlinkSync('test/tmp/index.html'); } catch(e) {}
		try { fs.rmdirSync('test/tmp/'); } catch(e) {}
	});

	grunt.registerTask('default', 'lint clean shower test');

};