/**
 * Created by zhangyang on 7/10/16.
 */

/* loading page  */

define([
    'jquery',
    'underscore',
    'spin'
], function ($, _, Spin) {
    'use strict';

    var loading = function (el, options) {
        this.el = el;
        this.back = $('<div class="back"></div>');
        this.options = _.defaults({}, options, {
            lines: 12,             // The number of lines to draw
            length: 0,             // The length of each line
            width: 10,              // The line thickness
            radius: 35,            // The radius of the inner circle
            scale: 1.0,            // Scales overall size of the spinner
            corners: 1,            // Roundness (0..1)
            color: '#5B5B5B',      // #rgb or #rrggbb
            opacity: 0,            // Opacity of the lines
            rotate: 0,             // Rotation offset
            direction: 1,          // 1: clockwise, -1: counterclockwise
            speed: 0.6,            // Rounds per second
            trail: 85,            // Afterglow percentage
            fps: 20,               // Frames per second when using setTimeout()
            zIndex: 2e9,           // Use a high z-index by default
            className: 'spinner',  // CSS class to assign to the element
            top: '30%',            // center vertically
            left: '50%',           // center horizontally
            shadow: false,         // Whether to render a shadow
            hwaccel: false,        // Whether to use hardware acceleration (might be buggy)
            position: 'absolute'  // Element positioning
        });
    };

    loading.prototype.showLoading = function (options) {
        if (options) {
            options = _.extend(this.options, options);
        }
        this.spinner = new Spin(options);
        this.spinner.spin(this.el);
        if ($(this.el).find('div.back').length === 0) {
            // $(this.el).append(this.back);
        }
        // $(this.el).show();
    };

    loading.prototype.hideLoading = function () {
        // $(this.el).hide();
        if (this.spinner) {
            this.spinner.stop();
        }
        this.back.remove();
    };

    loading.prototype.showError = function (msg) {
        var msg = msg || '噢,NO,加载错误^^!';
        $(this.el).html("<span class='error'>" + decodeURIComponent(msg) + "</span>");
    };

    return loading;

});