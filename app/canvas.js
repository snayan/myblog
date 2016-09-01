/**
 * Created by zhangyang on 9/1/16.
 */

define([
    'timer'
], function (Timer) {

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
                context.fillStyle = '#fff';
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
                        context.strokeStyle = '#fff';
                        context.moveTo(pi.x, pi.y);
                        context.lineTo(pj.x, pj.y);
                        context.stroke();
                    }
                }
            }

            context.restore();
        });
    }

    return {
        'showCanvas': function () {
            showCanvas(Timer);
        }
    }
});