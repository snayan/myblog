/**
 * Created by zhangyang on 6/13/16.
 */

/* article view */

define([
    'backbone',
    'loading'
], function (Backbone, Loading) {
    'use strict'

    var article = Backbone.View.extend({

        tagName: "article",

        className: "article",

        events: {},

        initialize: function () {
            this.loading = new Loading(this.el);
            this.listenTo(this.model, 'sync', this.update);
        },

        render: function () {
            this.loading.showLoading();
            this.model.fetch();
            // this.$el.html(this.model.get('content'));
            return this;
        },

        update: function () {
            this.$el.html(this.model.get('content'));
            this.loading.hideLoading();
        }

    });

    return article;
});