/**
 * Created by zhangyang on 7/26/16.
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
        backgrid: './bower_components/backgrid/lib/backgrid',
        'backbone.paginator': './bower_components/backbone.paginator/lib/backbone.paginator',
        spin: './bower_components/spin.js/spin.min',
        loading: '../loading',
        templates: '../.tmp/scripts/templates'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'global',
    'javascript/route/router-admin',
    'javascript/model/session-model'
], function ($, _, Backbone, Bootstrap, global, AdminRouter, Session) {

    'use strict';

    global.session = new Session();
    global.router = new AdminRouter();

    // // show header
    // global.router.showHeader();
    //
    // //show footer
    // global.router.showFooter();

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