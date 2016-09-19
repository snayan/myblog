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
            var content=this.model.get('content')||$('<div class="collect-tip tip"><span>噢,NO,找不到对应内容^^!</span></div>');
            this.$el.html(content);
            this.loading.hideLoading();
        }

    });

    return article;
});