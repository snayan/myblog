/**
 * Created by zhangyang on 5/30/16.
 */

require.config({
    shim:{
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: './bower_components/jquery/dist/jquery',
        backbone: './bower_components/backbone/backbone',
        underscore: './bower_components/underscore/underscore',
        bootstrap: './bower_components/bootstrap/dist/js/bootstrap',
        templates:'../.tmp/scripts/templates'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'global',
    'javascript/route/router'
],function($,_,Backbone,Bootstrap,global,Router){
    'use strict'
    
    global.router=new Router();
    
    // show header 
    global.router.showHeader();
    
    //show footer
    global.router.showFooter();
    
    var hasPushState = !!(window.history && history.pushState);
    if (hasPushState) {
        Backbone.history.start({
            pushState: false,
            root: '/'
        });
    } else {
        Backbone.history.start();
    }
});