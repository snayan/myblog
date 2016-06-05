/**
 * Created by zhangyang on 5/30/16.
 */

/* 定义路由信息 */

define([
    'backbone',
    'javascript/route/baseRouter'
],function(Backbone,BaseRouter){
   'use strict'

    var router=BaseRouter.extend({
        routes:{
            '/':'index',
            '/blog':'blog',
            '/about':'about',
            '/life':'life'
        },
        index:function(){

        },
        blog:function(){
            
        },
        about:function(){
            
        },
        life:function(){
            
        }
    });

    return router;

});