module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		clean: {
			dist: 'dist'
		},
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
		},
		copy: {
			index: {
				src: 'src/index.html',
				dest: 'dist/index.html'
			},
            images: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['*.png', '*.jpg', '*.gif', '*.bmp'],
                    dest: 'dist/images'
                }]
            }
		},
		usemin: {
            html: 'dist/index.html'
        },
		concat: {
			css: {
				src: ['src/**/*.css'],
				dest: 'dist/main.css'
			},
			js: {
				src: ['src/**/*.js'],
				dest: 'dist/main.js'
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			dist: {
				src: 'dist/main.css',
				dest: 'dist/main.min.css'
			}
		},
		uglify: {
			options: {
				compress: {
					'drop_console': false
				},
				mangle: true,
				preserveComments: false,
				sourceMap: false
			},
			dist: {
				src: 'dist/main.js',
				dest: 'dist/main.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['clean', 'jshint', 'copy', 'usemin', 'concat', 'cssmin', 'uglify']);
};
