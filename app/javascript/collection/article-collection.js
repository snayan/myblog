/**
 * Created by zhangyang on 6/5/16.
 */

/* article collection */

define([
    'backbone',
    'global',
    'javascript/model/article-model'
], function (Backbone, Global, Article) {
    'use strict'

    var articles = Backbone.Collection.extend({

        url: Global.api + '/blog/main',

        model: Article,

        initialize: function () {

        },

        parse: function (res, options) {
            this.total_entries = res[0].total_entries;
            res = res[1];
            return res;
        }

    });

    return articles;
});