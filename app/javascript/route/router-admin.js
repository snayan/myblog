/**
 * Created by zhangyang on 7/26/16.
 */

/* 定义管理员基本路由信息 */

define([
    'backbone',
    'javascript/route/baseRouter',
    'javascript/view/admin/admin-login',
    'javascript/view/admin/admin-index'
], function (Backbone, BaseRouter, loginView, indexView) {
    'use strict'

    var router = BaseRouter.extend({
        routes: {
            '': 'login',
            'login': 'login',
            'index': 'index'
        },
        login: function () {
            this.show(new loginView(), {"isLogin": true});
        },
        index: function () {
            this.show(new indexView(), {"isAnimate": true});
        }
    });

    return router;

});