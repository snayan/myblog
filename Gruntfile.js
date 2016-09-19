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

        //Clean files or folders
        clean: {
            dist: ['<%= client.dist %>', 'archive'],
            dev: ['<%= client.app %>/.tmp']
        },

        // compile sass to css
        sass: {
            options: {
                sourcemap: 'none'
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= client.app %>/style',
                        src: ['*.scss'],
                        ext: '.css',
                        dest: '<%= client.dist %>/style'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= client.app %>/style',
                        src: ['*.scss'],
                        ext: '.css',
                        dest: '<%= client.app %>/.tmp/styles'
                    }
                ]
            }
        },

        //Precompile Underscore templates to JST file
        jst: {
            options: {
                amd: true
            },
            dev: {
                files: {
                    '<%= client.app %>/.tmp/scripts/templates.js': ['<%= client.app %>/javascript/template/{,*/,*/*/}*.ejs']
                }
            },
            dist: {
                files: {
                    '<%= client.dist %>/script/templates.js': ['<%= client.app %>/javascript/template/{,*/,*/*/}*.ejs']
                }
            }
        },

        //optimize requirejs
        requirejs: {
            index: {
                options: {
                    baseUrl: "<%= client.app %>",
                    mainConfigFile: "<%= client.app %>/app.js",
                    paths: {
                        templates: '../<%= client.dist %>/script/templates'
                    },
                    useStrict: true,
                    wrapShim: false,
                    name: 'app',
                    out: "<%= client.dist %>/script/index.js"
                }
            },
            admin: {
                options: {
                    baseUrl: "<%= client.app %>",
                    mainConfigFile: "<%= client.app %>/admin.js",
                    paths: {
                        templates: '../<%= client.dist %>/script/templates'
                    },
                    useStrict: true,
                    wrapShim: false,
                    name: 'admin',
                    out: "<%= client.dist %>/script/admin.js"
                }
            }
        },

        //prepare use min
        useminPrepare: {
            html: '<%= client.app %>/*.html',
            options: {
                dest: '<%= client.dist %>'
            }
        },
        usemin: {
            html: ['<%= client.dist %>/*.html'],
            options: {
                assetsDirs: ['<%= client.dist %>/asserts']
            }
        },

        //concat files
        concat: {
            index_css: {
                options: {
                    separator: '',
                },
                src: [
                    '<%= client.app %>/bower_components/bootstrap/dist/css/bootstrap.css',
                    '<%= client.dist %>/style/index.css'
                ],
                dest: '<%= client.dist %>/style/index.css'
            },
            index_js: {
                options: {
                    separator: ';',
                },
                src: [
                    '<%= client.app %>/bower_components/requirejs/require.js',
                    '<%= client.dist %>/script/index.js'
                ],
                dest: '<%= client.dist %>/script/index.js'
            },
            admin_css: {
                options: {
                    separator: '',
                },
                src: [
                    '<%= client.app %>/bower_components/bootstrap/dist/css/bootstrap.css',
                    '<%= client.app %>/bower_components/backgrid/lib/backgrid.css',
                    '<%= client.app %>/bower_components/backgrid-paginator/backgrid-paginator.css',
                    '<%= client.dist %>/style/admin.css'

                ],
                dest: '<%= client.dist %>/style/admin.css'
            },
            admin_js: {
                options: {
                    separator: ';',
                },
                src: [
                    '<%= client.app %>/bower_components/requirejs/require.js',
                    '<%= client.dist %>/script/admin.js'
                ],
                dest: '<%= client.dist %>/script/admin.js'
            }
        },

        //minify css
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= client.dist %>/style',
                    src: ['*.css'],
                    dest: '<%= client.dist %>/style',
                    ext: '.min.css'
                }]
            }
        },

        //minify image
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= client.app %>/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= client.dist %>/images'
                }]
            }
        },

        //minify html
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= client.dist %>/index.html': '<%= client.app %>/index.html',
                    '<%= client.dist %>/admin.html': '<%= client.app %>/admin.html'
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= client.dist %>/script',
                    src: ['index.js', 'admin.js'],
                    dest: '<%= client.dist %>/script',
                    ext: '.min.js'
                }]
            }
        },

        //Asset revisioning by using file content hashing
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= client.dist %>/asserts/*.*'
                    ]
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
                    debug: true,
                    node_env: 'development'
                }
            },
            dist: {
                options: {
                    script: 'server/bin/www',
                    node_env: 'production'
                }
            }
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
            dist: {
                files: [
                    {
                        cwd: '<%= client.app %>',
                        src: '*.html',
                        dest: '<%= client.dist %>',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: '<%= client.dist %>/script',
                        src: '*.min.js',
                        dest: '<%= client.dist %>/asserts',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: '<%= client.dist %>/style',
                        src: '*.min.css',
                        dest: '<%= client.dist %>/asserts',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },

        //compress the production files
        compress: {
            main: {
                options: {
                    archive: function () {
                        var date = new Date();
                        return 'archive/' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '.zip'
                    },
                    mode: 'zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= client.dist %>',
                        src: ['asserts/**'],
                        // src: ['asserts/**', 'images/**', '*.html'],
                        dest: '<%= client.dist %>'
                    },
                    {
                        expand: true,
                        cwd: 'server',
                        src: [
                            '**',
                            // 'app.js',
                            // 'api/blog/*'
                        ],
                        dest: 'server'
                    },
                    {
                        expand: true,
                        src: ['bower.json', 'package.json']
                    }
                ]
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
                tasks: ['jst:dev']
            },
            sass: {
                files: ['<%= client.app %>/style/**/*.{scss,sass}'],
                tasks: ['sass:dev']
            },
            express: {
                files: ['server/**/*.js', 'test/**/*.js'],
                tasks: ['express:dev']
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['clean:dev', 'sass:dev', 'jst:dev', 'express:dev', 'open:dev', 'watch']);

    //compile sass ,jst,requirejs
    grunt.registerTask('compile:dist', [
        'sass:dist',
        'jst:dist',
        'requirejs:index',
        'requirejs:admin'
    ]);

    //build project
    grunt.registerTask('build', [
        'clean:dist',
        'compile:dist',
        'useminPrepare',
        'concat:index_css',
        'concat:admin_css',
        'cssmin:dist',
        'imagemin:dist',
        // 'htmlmin:dist',
        'concat:index_js',
        'concat:admin_js',
        'uglify:dist',
        'copy:dist',
        // 'rev:dist',
        'usemin'
    ]);

    //dispatch server in brower
    grunt.registerTask('server', [
        'build',
        'express:dist',
        'open:dev',
        'watch'
    ]);

    //publish production
    grunt.registerTask('publish', [
        'build',
        'compress'
    ]);


};