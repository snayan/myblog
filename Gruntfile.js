/**
 * Created by zhangyang on 5/31/16.
 */

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

        //Precompile Underscore templates to JST file
        jst:{
            options:{
                amd:true
            },
            compile:{
                files:{
                    '.tmp/scripts/templates.js':['<%= yeoman.app %>/javascript/template/{,*/,*/*/}*.ejs']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.registerTask('default',['jst']);
}