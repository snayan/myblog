/**
 * Created by zhangyang on 8/14/16.
 */

/** admin left operation view **/

define([
    'backbone'
], function (Backbone) {

    'use strict';

    var left = Backbone.View.extend({

        tagName: 'div',

        className: 'admin-left',

        events: {},

        initialize: function () {

        },

        render: function () {
            return this;
        }

    });

    return left;

});