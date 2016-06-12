/**
 * Created by zhangyang on 6/5/16.
 */

/* article collection */

define([
    'backbone',
    'global',
    'javascript/model/article-model'
],function(Backbone,Global,Article){
   'use strict'

    var articles=Backbone.Collection.extend({

        url:Global.api+'/blog',
        
        model:Article,

        initialize:function(){

        },

        parse:function(res,options){
            return res;
        }
        
    });

    return articles;
});