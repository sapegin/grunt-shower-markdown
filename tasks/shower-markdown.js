/**
 * Grunt task that generates Shower presentations from Markdown source
 *
 * @author Artem Sapegin (http://sapegin.me)
 */

/*jshint node:true */
module.exports = function(grunt) {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var marked = require('marked');
	var _ = grunt.util._;

	grunt.registerMultiTask('shower', 'Generates Shower presentations from Markdown source', function() {
		var target = this.target;
		var options = this.data;

		var srcFile = options.src ? options.src : target + '.md';
		var src = grunt.file.read(srcFile);
		var slides = src.split('!SLIDE');
		var caption = marked(slides.shift());  // Caption is a text above first !SLIDE
		var title = options.title;

		if (!options.title) {
			// By default title is a first line of caption, with striped tags
			title = caption.substring(0, caption.indexOf('\n')).replace(/<[^>]*>/g, '').trim();
		}

		slides.forEach(function(source, index) {
			// Slide metadata
			var firstLineLength = source.indexOf('\n');
			var info = source.substring(0, firstLineLength).trim();
			var classes = info.split(' ');
			var id;
			if (classes[0].charAt(0) === '#') {
				id = classes.shift().substring(1);
			}
			source = source.substring(firstLineLength);  // Remove first line

			// Slide content
			source = source
				.replace(/(\n[\-*])\?/g, '$1 ?')  // Delayed lists
				.replace(/!\[(.*?)\]\((.*?)\)((?: \.\w+)+)/g, _customImg)  // Images with custom classes
			;
			var html = marked(source);
			html = html
				.replace(/@@@(.*?)@@@/g, '<mark class="important">$1</mark>')
				.replace(/@@(.*?)@@/g, '<mark>$1</mark>')
				.replace(/<p>(<img[^<]*)<\/p>/mg, '$1')
				.replace(/<li>\?\s*/g, '<li class="next">')  // Delayed lists
				.replace(/<pre>([\s\S]*)<\/pre>/g, _addCodeTags)  // Enable line numbering in code examples
				.replace(/<pre><code class="lang-([^"]+)"/g, '<pre><code class="language-$1"')  // HTML5 class names
				.replace(/<code><\/code>/g, '<code>&shy;</code>')  // Fix empty lines
				.replace(/\s*<code>&shy;<\/code><\/pre>/g, '</pre>')  // Remove last empty line
				.replace(/(<h\d) id="[^"]*">/g, '$1>')  // Remove IDs from headings
			;

			slides[index] = {
				id: id,
				classes: classes,
				html: html
			};
		});

		var context = {
			title: title,
			lang: options.lang || 'en',
			theme: options.theme || 'themes/ribbon',
			styles: assets(options.styles),
			scripts: assets(options.scripts),
			progress: options.progress !== false,
			footer: options.footer || '',
			caption: caption,
			slides: slides
		};
		var templateFile = path.join(__dirname, 'templates/presentation.html');
		var template = fs.readFileSync(templateFile, 'utf8');
		var html = grunt.template.process(template, {data: context});

		var dest = options.dest ? options.dest : target + '.html';
		grunt.file.write(dest, html);

		grunt.log.writeln("File '" + dest + "' created.");
	});


	function _addCodeTags(m, code) {
		return '<pre>' + code.replace(/\n/g, '</code>\n<code>') + '</pre>';
	}

	function _customImg(m, alt, src, classes) {
		classes = _.trim(classes.replace(/\W+/g, ' '));
		return '<img src="' + src + '" alt="' + alt + '" class="' + classes + '">';
	}

	/**
	 * Returns list of files with fingerprints
	 */
	function assets(files) {
		if (!files) return [];

		if (!_.isArray(files)) files = [files];
		files.forEach(function(file, fileIdx) {
			if (!fs.existsSync(file)) {
				grunt.warn('Asset file "' + file + '" not found.');
				return;
			}
			files[fileIdx] = file + '?' + fs.statSync(file).mtime.getTime();
		});

		return files;
	}

};
