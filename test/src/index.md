# Title
		
[Author](http://sapegin.me)


!SLIDE #Cover shout cover

## Title
### Subtitle

![Image](pictures/pic.png)


!SLIDE

## Simple list

Some words.

- First.
- Second.
	* One
	* Two
- Third.

## Delayed list

- First.
-? Second.
-? Third.


!SLIDE smallcode

## Code

```javascript
module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			main: {
				src: 'src/*.js',
				dest: 'build/scripts.js'
			}
		},
		min: {
			main: {
				src: '<config:concat.main.dest>',
				dest: 'build/scripts.min.js'
			}
		}
	});
	grunt.registerTask('default', 'concat min');
};
```


!SLIDE

## Code with marks

```javascript
concat: {
	@@main: {@@
		text: @@@'Hello world'@@@
	@@}@@
}
```

!SLIDE

## Image with classes

![](pictures/pony.png) .place .r .b