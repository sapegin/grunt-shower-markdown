# Grunt task that generates Shower presentations from Markdown source

## Installation

Install `grunt-shower-markdown`:

```
npm install grunt-shower-markdown
```

Add somewhere in your `grunt.js`:

```javascript
grunt.loadNpmTasks('grunt-shower-markdown');
```

Add a section named `shower` into your `grunt.js` file. See Parameters section below for details.


## Parameters

### [title] {string} (default: first line of source file)

Title of presentation (used in `<title>` tag).

### [src] {string} (default: `<target>.md`)

Path of source Markdown file.

### [dest] {string} (default: `<target>.html`)

Path of result HTML file.

### [lang] {string} (default: `en`)

Language of presentation.

### [theme] {string} (default: `themes/ribbon`)

Path where theme of presentation is located.

### [styles] {array|string}

List of CSS files specific to your presentation.

### [scripts] {array|string}

List of JavaScript files specific to your presentation.

### [progress] {string} (default: `true`)

Hides progress bar when `false`.


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
	
	grunt.registerTask('default', 'shower');
};		
```


## Presentation markup

	# Presentation Title
			
	[Author](http://sapegin.me) and any other content to show above slides.

	!SLIDE #SlideID class1 class2

	## Slide Title

	![Image](pictures/pic.png)

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

grunt-shower-markdown uses [GitHub flavored Markdown](http://github.github.com/github-flavored-markdown/) with some extenstions.

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

---

## License

The MIT License, see the included `License.md` file.
