/**
 * Created by zhangyang on 7/26/16.
 */

/* 定义管理员基本路由信息 */

define([
    'backbone',
    'javascript/route/baseRouter',
    'javascript/view/admin/admin-login'
], function (Backbone, BaseRouter, loginView) {
    'use strict'

    var router = BaseRouter.extend({
        routes: {
            '': 'index'
        },
        index: function () {
            this.show(new loginView());
        }
    });

    return router;

});