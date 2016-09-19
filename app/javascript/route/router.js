/**
 * Created by zhangyang on 5/30/16.
 */

/* 定义基本路由信息 */

define([
    'backbone',
    'javascript/route/baseRouter',
    'javascript/view/body/blog-body',
    'javascript/view/body/git-body',
    'javascript/view/body/collect-body',
    'javascript/model/article-model',
    'javascript/view/body/content/article'
], function (Backbone, BaseRouter, BlogView, GitView, CollectView, ArticleModel, ArticleView) {
    'use strict';

    var router = BaseRouter.extend({
        routes: {
            '': 'index',
            'blog': 'showBlog',
            'project': 'showProject',
            'collect': 'showCollect',
            'blog/:id': 'showArticle'
        },
        index: function () {
            this.show(new BlogView());
        },
        showArticle: function (id) {
            this.show(new ArticleView({model: new ArticleModel({'id': id})}));
        },
        showBlog: function () {
            this.show(new BlogView());
        },
        showProject: function () {
            this.show(new GitView());
        },
        showCollect: function () {
            this.show(new CollectView());
        }
    });

    return router;

});