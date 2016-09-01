/**
 * Created by zhangyang on 5/31/16.
 */

var expressConfig = require('./server/util/config').express;
/* grunt files */

module.exports = function (grunt) {
    'use strict';

    var clientConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({

        //file config
        client: clientConfig,
        server: expressConfig,

        //Precompile Underscore templates to JST file
        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    '<%= client.app %>/.tmp/scripts/templates.js': ['<%= client.app %>/javascript/template/{,*/,*/*/}*.ejs']
                }
            }
        },

        //
        compass: {
            options: {
                sassDir: '<%= client.app %>/style',
                cssDir: '<%= client.app %>/.tmp/styles',
                imagesDir: '<%= client.app %>/images',
                javascriptsDir: '<%= client.app %>/javascript',
                fontsDir: '<%= client.app %>/styles/fonts',
                generatedImagesDir: '<%= client.app %>/.tmp/images/generated',
                importPath: 'app/bower_components',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    environment: 'production',
                    clean: true
                }
            },
            dev: {
                options: {
                    debugInfo: false,
                    environment: 'development'
                }
            }
        },

        //Grunt task for running express
        express: {
            options: {
                port: '<%=server.port %>'
            },
            dev: {
                options: {
                    script: 'server/bin/www',
                    debug: true
                }
            },
            prod: {
                options: {
                    script: 'server/bin/www',
                    node_env: 'production'
                }
            }
        },

        //Clean files or folders
        clean: {
            dist: ['<%= client.app %>/.tmp', '<%= client.dist %>'],
            dev: ['<%= client.app %>/.tmp']
        },

        //open urls and files from grunt task
        open: {
            dev: {
                path: 'http://localhost:<%= server.port %>',
                app: 'Google Chrome'
            }
        },

        //copy files
        copy: {
            dev: {
                cwd: 'node_modules/octicons/build/font/',
                src: ['octicons.eot', 'octicons.svg', 'octicons.ttf', 'octicons.woff', 'octicons.woff2'],
                // src:'octicons.css',
                dest: '<%= client.app %>/.tmp/styles/',
                expand: true,
                flatten: true
            },
            dist: {},
            options: {
                process: function (content, srcpath) {
                    return content;
                }
            }
        },

        //Run predefined tasks whenever watched file patterns are added, changed or deleted
        watch: {
            options: {
                livereload: true,
                reload: true,
                spawn: false
            },
            jst: {
                files: ['<%= client.app %>/javascript/template/**/*.ejs'],
                tasks: ['jst']
            },
            compass: {
                files: ['<%= client.app %>/style/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            express: {
                files: ['server/**/*.js', 'test/**/*.js'],
                tasks: ['express:dev']
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean:dev', 'compass:dev', 'copy:dist', 'jst', 'express:dev', 'open:dev', 'watch']);
    // grunt.registerTask('default', ['clean:dev', 'compass:dev', 'copy:dist', 'jst', 'express:dev', 'open:dev']);

    // grunt.registerTask('default',['clean:dev']);

};