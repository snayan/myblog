/**
 * Created by zhangyang on 5/30/16.
 */

require.config({
    shim: {
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
        spin: './bower_components/spin.js/spin.min',
        loading: './loading',
        templates: './.tmp/scripts/templates'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'global',
    'javascript/route/router',
    'canvas'
], function ($, _, Backbone, Bootstrap, global, Router, Canvas) {
    'use strict'

    global.router = new Router();

    // show header 
    global.router.showHeader();

    //show footer
    global.router.showFooter();

    //show canvas
    Canvas.showCanvas();

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