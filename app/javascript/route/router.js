/**
 * Created by zhangyang on 5/30/16.
 */

/* 定义基本路由信息 */

define([
    'backbone',
    'javascript/route/baseRouter',
    'javascript/view/body/blog-body',
    'javascript/view/body/life-body',
    'javascript/view/body/collect-body'
],function(Backbone,BaseRouter,BlogView,LifeView,collectView){
   'use strict'

    var router=BaseRouter.extend({
        routes:{
            '':'index',
            'blog':'blog',
            'life':'life',
            'collect':'collect'
        },
        index:function(){
            this.show(new BlogView());
        },
        blog:function(){
            this.show(new BlogView());
        },
        life:function(){
            this.show(new LifeView());
        },
        collect:function(){
            this.show(new collectView());
        }
    });

    return router;

});