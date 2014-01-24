# Grunt task that generates Shower presentations from Markdown source

[![Build Status](https://travis-ci.org/sapegin/grunt-shower-markdown.png)](https://travis-ci.org/sapegin/grunt-shower-markdown)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Installation

This plugin requires Grunt 0.4.

### 1. Download Shower

You need just one file. [Download it](https://raw.github.com/shower/shower/master/shower.min.js) and save as `shower/shower.min.js`.

### 2. Download theme

Download one of [Shower themes](https://github.com/shower/shower/tree/master/themes).

### 3. Install grunt-shower-markdown

```
npm install grunt-shower-markdown --save-dev
```

Add somewhere in your `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-shower-markdown');
```

Add a section named `shower` into your `Gruntfile.js` file. See Parameters section below for details.


## Parameters

### title

Type: `string`, default: first line of source file.

Presentation title (used in `<title>` tag).

### src

Type: `string`, default: `<target>.md`.

Path of Markdown source file.

### dest

Type: `string`, default: `<target>.html`.

Path of destination HTML file.

### lang

Type: `string`, default: `en`.

Presentation language.

### theme

Type: `string`, default: `themes/ribbon`.

Path where theme of presentation is located.

### styles

Type: `array|string`, optional.

List of CSS files specific to your presentation.

### scripts

Type: `array|string`, optional.

List of JavaScript files specific to your presentation.

### progress

Type: `string`, default: `true`.

Hides progress bar when `false`.

### footer

Type: `string`, optional.

Any HTML to put before `</body>`. Google Analytics for example.


## Config Example

``` javascript
module.exports = function(grunt) {
	grunt.initConfig({
		shower: {
			index: {
				title: 'Test presentation',
				src: 'src/index.md',
				styles: 'src/styles.css'
				scripts: [
					'libs/highlight.js',
					'src/scripts.js'
				]
			}
		},
		watch: {
			shower: {
				files: 'src/*',
				tasks: 'shower'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-shower-markdown');
	
	grunt.registerTask('default', ['shower']);
};		
```


## Presentation markup

	# Presentation Title
			
	[Author](http://sapegin.me) and any other content to show above slides.

	!SLIDE #SlideID class1 class2

	## Slide Title

	![Image](pictures/pic.png)

	![Image with custom classes](pictures/pic2.png) .place .r .b

	<p class="note">Some HTML</p>

	- List item one
	-? Two (delayed)
	-? Three (delayed)

	!SLIDE #Cover shoot

	## Hello world!

	!SLIDE

	## Code example

	```
	@@concat@@: {
		main: {
			text: @@@'Hello world'@@@
		}
	}
	```


## Markdown extensions

You can use [GitHub flavored Markdown](http://github.github.com/github-flavored-markdown/) with some extenstions.

### Delayed lists

If you want to delay display of list items, put `?` after list marker:

```
- One
-? Two (delayed)
-? Three (delayed)
```

### Text highlighting

You can highlight important parts of presentation using `@@text@@` (important) and `@@@text@@@` (very important):

```
@@concat@@: {
	main: {
		text: @@@'Hello world'@@@
	}
}
```

### Images with classes

```
![](pictures/pony.png) .place .r .b
```


## Changelog

The changelog can be found in the `Changelog.md` file.


---

## License

The MIT License, see the included `License.md` file.
