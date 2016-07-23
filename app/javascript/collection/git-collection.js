/**
 * Created by zhangyang on 7/3/16.
 */

/* git collection */

define([
    'backbone',
    'global',
    'javascript/model/git-model'
], function (backbone, Global, gitModel) {
    'use strict'

    var gitCollection = backbone.Collection.extend({

        'url': Global.api + '/git',

        model: gitModel,

        initialize: function () {

        },

        parse: function (response, option) {
            return response;
        }

    });

    return gitCollection;
});