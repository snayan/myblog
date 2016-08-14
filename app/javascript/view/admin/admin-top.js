/**
 * Created by zhangyang on 8/14/16.
 */

/** admin top operation view **/

define([
    'backbone'
], function (Backbone) {

    'use strict';

    var top = Backbone.View.extend({

        tagName: 'div',

        className: 'admin-top',

        events: {},

        initialize: function () {

        },

        render: function () {
            return this;
        }
    });

    return top;
});
