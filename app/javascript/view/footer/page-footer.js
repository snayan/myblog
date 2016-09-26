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
            this.$el.html('<p>&copy粤ICP备16085880号-1&nbsp&nbsp<a href="/admin">Created by snayan</a>.</p>')
            return this;
        }
    });

    return footer;

});