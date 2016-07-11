/**
 * Created by zhangyang on 5/31/16.
 */

var expressConfig=require('./server/util/config').express;
/* grunt files */

module.exports=function(grunt){
    'use strict'

    var yeomanConfig={
        app:'app',
        dist:'dist'
    };

    grunt.initConfig({

        //file config
        yeoman:yeomanConfig,
        server:expressConfig,

        //Precompile Underscore templates to JST file
        jst:{
            options:{
                amd:true
            },
            compile:{
                files:{
                    '<%= yeoman.app %>/.tmp/scripts/templates.js':['<%= yeoman.app %>/javascript/template/{,*/,*/*/}*.ejs']
                }
            }
        },

        //
        compass:{
            options:{
                sassDir: '<%= yeoman.app %>/style',
                cssDir: '<%= yeoman.app %>/.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/javascript',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                generatedImagesDir: '.tmp/images/generated',
                importPath: 'app/bower_components',
                httpImagesPath: '../images',
                httpGeneratedImagesPath: '../images/generated',
                httpFontsPath: 'fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist:{
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            dev:{
                options: {
                    debugInfo:false
                }
            }
        },

        //Grunt task for running express
        express:{
            options:{
                port:'<%=server.port %>'
            },
            dev:{
                options:{
                    script:'server/bin/www',
                    debug:true
                }
            },
            prod:{
                options:{
                    script:'server/bin/www',
                    node_env:'production'
                }
            }
        },

        //Clean files or folders
        clean:{
            dist:['<%= yeoman.app %>/.tmp','<%= yeoman.dist %>'],
            dev:['<%= yeoman.app %>/.tmp']
        },

        //open urls and files from grunt task
        open:{
            dev:{
                path:'http://localhost:<%= server.port %>',
                app:'Google Chrome'
            }
        },

        //copy files
        copy:{
            dev:{
                cwd:'node_modules/octicons/build/font/',
                src:['octicons.eot','octicons.svg','octicons.ttf','octicons.woff','octicons.woff2'],
                // src:'octicons.css',
                dest:'<%= yeoman.app %>/.tmp/styles/',
                expand:true,
                flatten:true
            },
            dist:{

            },
            options:{
                process:function (content,srcpath) {
                    return content;
                }
            }
        },

        //Run predefined tasks whenever watched file patterns are added, changed or deleted
        watch:{
            options:{
                livereload:true,
                reload:true,
                spawn:false
            },
            jst:{
                files:['<%= yeoman.app %>/javascript/template/**/*.ejs'],
                tasks:['jst']
            },
            // compass:{
            //     files:['<%= yeoman.app %>/style/**/*.{scss,sass}'],
            //     tasks:['compass:dev']
            // },
            express:{
                files:['server/**/*.js','test/**/*.js'],
                tasks:['express:dev']
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
    
    grunt.registerTask('default',['clean:dev','compass:dev','copy:dist','jst','express:dev','open:dev','watch']);
};