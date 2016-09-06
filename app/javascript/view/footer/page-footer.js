/**
 * Created by zhangyang on 9/2/16.
 */

define([
    'backbone'
], function (Backbone) {

    'use strict';

    var footer = Backbone.View.extend({

        tagName: 'footer',

        className: 'page-footer',

        events: {},

        initialize: function (options) {

        },

        render: function () {
            this.$el.html('<p>&copy2016-粤XXX备XXXXXXXX号&nbsp&nbspCreated by snayan.</p>')
            return this;
        }
    });

    return footer;

});