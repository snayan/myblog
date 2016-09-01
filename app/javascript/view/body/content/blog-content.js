/**
 * Created by zhangyang on 6/7/16.
 */

/* blog home page blog content view */

define([
    'underscore',
    'backbone',
    'loading',
    'javascript/collection/article-collection',
    'javascript/view/body/content/article-list'
], function (_, Backbone, Loading, ArticleCollection, ArticleListView) {

    'use strict';

    var content = Backbone.View.extend({

        tagName: 'div',

        className: 'content blog-content-div',

        initialize: function () {

            this.articles = [];

            this.loading = new Loading(this.el);
            this.collection = new ArticleCollection();
            this.listenTo(this.collection, 'reset', this.reset);
            this.listenTo(this.collection, 'error', this.error);
            this.preOrNext(this.model);
        },

        render: function () {
            return this;
        },

        addOne: function (article) {
            var articleView = new ArticleListView({model: article});
            this.articles.push(articleView);
            this.$el.append(articleView.render().$el);
        },

        addAll: function () {
            //delete has exists article view
            _.forEach(this.articles, function (article) {
                if (article && article instanceof Backbone.View) {
                    article.remove();
                }
            });
            this.$el.empty();
            this.articles.length = 0;
            this.collection.each(this.addOne, this);
            if (this.collection.length === 0) {
                this.$el.html('<div class="tip">楼主很懒,暂无符合条件的文章</div>');
            }
        },

        search: function (val) {
            this.model.set('currentPage', 1);
            this.model.set('totalCount', 0);
            this.model.set('search', val);
            this.preOrNext(this.model);
        },

        preOrNext: function (model) {
            this.loading.showLoading();
            this.collection.fetch({
                wait: true,
                reset: true,
                data: {
                    'search': model.get('search'),
                    'page': model.get('currentPage'),
                    'per_page': model.get('showCount')
                }
            });
        },

        error: function () {
            this.loading.showError();
        },

        reset: function () {
            this.model.set('totalCount', this.collection.total_entries);
            this.addAll();
            this.trigger('reset',this.model);
            this.loading.hideLoading();
        }

    });

    return content;

});