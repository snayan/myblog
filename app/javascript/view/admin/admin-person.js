/**
 * Created by zhangyang on 8/14/16.
 */

/** admin person view **/

define([
    'backbone'
], function (Backbone) {

    'use strict';

    var person = Backbone.View.extend({

        tagName: 'div',

        className: 'admin-person',

        events: {},

        initialize: function () {

        },

        render: function () {

            return this;
        }
    });

    return person;

});