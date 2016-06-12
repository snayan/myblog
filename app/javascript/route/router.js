/**
 * Created by zhangyang on 5/30/16.
 */

/* 定义路由信息 */

define([
    'backbone',
    'javascript/route/baseRouter',
    'javascript/view/body/blog-body',
    'javascript/view/body/life-body',
    'javascript/view/body/about-body'
],function(Backbone,BaseRouter,BlogView,LifeView,AboutView){
   'use strict'

    var router=BaseRouter.extend({
        routes:{
            '':'index',
            'blog':'blog',
            'about':'about',
            'life':'life'
        },
        index:function(){
            this.show(new BlogView());
        },
        blog:function(){
            this.show(new BlogView());
        },
        about:function(){
            this.show(new AboutView());
        },
        life:function(){
            this.show(new LifeView());
        }
    });

    return router;

});