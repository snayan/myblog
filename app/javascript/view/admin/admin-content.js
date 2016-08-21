/**
 * Created by zhangyang on 8/16/16.
 */

/** admin content view **/

define([
    'backbone'
], function (Backbone) {

    'use strict';

    var content = Backbone.View.extend({

        tagName: 'div',

        className: 'admin-content',

        events: {},

        initialize: function () {

        },

        render: function () {
            return this;
        }

    });

    return content;

});