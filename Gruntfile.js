/*
 * grunt-concat-in-order
 * https://github.com/miensol/grunt-concat-in-order
 *
 * Copyright (c) 2013 Piotr Mionskowski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        concat_in_order: {
            default_options: {
                files: {
                    'tmp/default_options.js': ['test/default/**/*.js']
                }
            },
            cycle_options: {
                files: {
                    'tmp/cycle_options.js': ['test/cycle/**/*.js']
                }
            },
            missing_options: {
                files: {
                    'tmp/missing_options.js': ['test/missing/**/*.js']
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'concat_in_order:default_options', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
