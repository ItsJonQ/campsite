module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            main: {
                src: 'js/app.js',
                dest: 'public/js/main.js'
            }
        },

        jshint: {
            files: ['js/**/*.js'],
            options: {
                force: true,
                strict: false, // switched it to false for browserify's AMD
                smarttabs: true,
                globals: {
                    _: true,
                    ko: true,
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                expand: true,
                cwd: 'css',
                src: ['main.scss'],
                dest: 'build/css',
                ext: '.css'
            }
        },

        watch: {
            styles: {
                files: ['css/**/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['browserify:main']
            }
        }

    });


    // Loading Grunt Tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');


    // Tasks
    grunt.registerTask('default', ['browserify', 'jshint', 'sass', 'watch']);

    grunt.registerTask('bund', ['jshint', 'browserify']);

};