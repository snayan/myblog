/**
 * Created by zhangyang on 6/5/16.
 */

/* article model */

define([
    'backbone'
],function(Backbone){
    'use strict'

    var article=Backbone.Model.extend({

        defaults:{
            title:'',
            author:'',
            url:'',
            createDate:null,
            updateDate:null,
            show:'',
            meta:'',
            description:''
        },

        initialize:function(){

        },

        parse:function(res,options){

            return res;
        },

        validate:function(){

            return true;
        }

    });

    return article;
})