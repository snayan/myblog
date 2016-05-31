/**
 * Created by zhangyang on 5/30/16.
 */

/* 定义路由信息 */

define(['backbone'],function(Backbone){
   'use strict'

    var router=Backbone.Route.extend({
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