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
        loading: '../loading',
        templates: '../.tmp/scripts/templates',
        timer: './timer'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'global',
    'javascript/route/router',
    'timer'
], function ($, _, Backbone, Bootstrap, global, Router, Timer) {
    'use strict'

    global.router = new Router();

    // show header 
    global.router.showHeader();

    //show footer
    global.router.showFooter();

    //show canvas
    showCanvas(Timer);

    var hasPushState = !!(window.history && history.pushState);
    if (hasPushState) {
        Backbone.history.start({
            pushState: false,
            root: '/'
        });
    } else {
        Backbone.history.start();
    }

    function showCanvas(timer) {
        var canvas = document.querySelector("canvas"),
            context = canvas.getContext("2d"),
            width = canvas.width,
            height = canvas.height,
            radius = 1.5,
            minDistance = 80,
            maxDistance = 100,
            minDistance2 = minDistance * minDistance,
            maxDistance2 = maxDistance * maxDistance;

        var tau = 2 * Math.PI,
            n = 40,
            particles = new Array(n);

        for (var i = 0; i < n; ++i) {
            particles[i] = {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: 0,
                vy: 0
            };
        }

        timer.timer(function (elapsed) {
            context.save();
            context.clearRect(0, 0, width, height);

            for (var i = 0; i < n; ++i) {
                var p = particles[i];
                p.x += p.vx;
                if (p.x < -maxDistance) p.x += width + maxDistance * 2; else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
                p.y += p.vy;
                if (p.y < -maxDistance) p.y += height + maxDistance * 2; else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
                p.vx += 0.05 * (Math.random() - .5) - 0.01 * p.vx;
                p.vy += 0.05 * (Math.random() - .5) - 0.01 * p.vy;
                context.beginPath();
                context.fillStyle='#fff';
                context.arc(p.x, p.y, radius, 0, tau);
                context.fill();
            }

            for (var i = 0; i < n; ++i) {
                for (var j = i + 1; j < n; ++j) {
                    var pi = particles[i],
                        pj = particles[j],
                        dx = pi.x - pj.x,
                        dy = pi.y - pj.y,
                        d2 = dx * dx + dy * dy;
                    if (d2 < maxDistance2) {
                        context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
                        context.beginPath();
                        context.strokeStyle='#fff';
                        context.moveTo(pi.x, pi.y);
                        context.lineTo(pj.x, pj.y);
                        context.stroke();
                    }
                }
            }

            context.restore();
        });
    }
});