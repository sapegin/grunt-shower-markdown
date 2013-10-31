/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		shower: {
			index: {
				src: 'test/src/index.md',
				dest: 'test/tmp/index.html',
				styles: 'test/src/styles.css'
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/*.js']
			}
		},
		jshint: {
			all: ['tasks/*.js'],
			options: {
				node: true,
				white: false,
				smarttabs: true,
				eqeqeq: true,
				immed: true,
				latedef: false,
				newcap: true,
				undef: true
			}
		},
		clean: ['test/tmp']
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('default', ['jshint', 'clean', 'shower', 'test', 'clean']);

};