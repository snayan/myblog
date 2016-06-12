/**
 * Created by zhangyang on 6/7/16.
 */

/* article view */

define([
    'backbone',
    'templates'
],function(Backbone,JST){
    'use strict'
    
    var article=Backbone.View.extend({
        
        template:JST['app/javascript/template/body/content/article.ejs'],
        
        tagName:'article',
        
        className:'article-list',
        
        events:{
            
        },
        
        initialize:function(){
            
        },
        
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
        
    });
    
    return article;
});