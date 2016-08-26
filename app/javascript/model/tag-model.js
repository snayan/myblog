/**
 * Created by zhangyang on 6/11/16.
 */

/* tag model */

define([
    'backbone'
], function (Backbone) {
    'use strict'

    var tagModel = Backbone.Model.extend({

        idAttribute: 'name',

        defaults: {
            name: '',
            number: 0
        },

        initialize: function () {

        },

        parse: function (res, option) {
            return res;
        }
    });

    return tagModel;
});
