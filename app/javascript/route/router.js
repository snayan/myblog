/**
 * Created by zhangyang on 5/30/16.
 */

/* 定义基本路由信息 */

define([
    'backbone',
    'javascript/route/baseRouter',
    'javascript/view/body/blog-body'
], function (Backbone, BaseRouter, BlogView) {
    'use strict'

    var router = BaseRouter.extend({
        routes: {
            '': 'index'
        },
        index: function () {
            this.show(new BlogView());
        }
    });

    return router;

});