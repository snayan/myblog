/**
 * Created by zhangyang on 6/5/16.
 */

/* article model */

define([
    'backbone',
    'global'
], function (Backbone, Global) {
    'use strict'

    var article = Backbone.Model.extend({

        url: Global.api + '/blog/main/:id',

        defaults: {
            title: '',
            author: '',
            url: '',
            createDate: null,
            updateDate: null,
            show: '',
            meta: '',
            description: '',
            content: ''
        },

        initialize: function (option) {
            var id = option && option.id ? option.id : '';
            this.url = String.prototype.replace.call(this.url, ':id', encodeURIComponent(id));
        },

        parse: function (res, options) {
            res.ifShow = res.show ? '是' : '否';
            res.seeCount = res.meta ? res.meta.seeCount : 0;
            return res;
        },

        validate: function () {

            return true;
        }

    });

    return article;
});