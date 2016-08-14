/**
 * Created by zhangyang on 8/14/16.
 */

/** admin body view **/

define([
    'backbone'
], function (Backbone) {

    'use strict';

    var body = Backbone.View.extend({

        tagName: 'div',

        className: 'admin-body',

        events: {},

        initialize: function () {

        },

        render: function () {
            return this;
        }
    });

    return body;
});