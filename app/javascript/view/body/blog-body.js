/**
 * Created by zhangyang on 6/7/16.
 */

/* blog home view */

define([
    'backbone',
    'javascript/view/body/left/blog-left',
    'javascript/view/body/content/blog-content',
    'javascript/view/body/search'
],function(Backbone,BlogLeft,BlogContent,Search){
   'use strict'
    
    var blogHome=Backbone.View.extend({
        
        tagName:'div',
        
        className:'blog-home',

        initialize:function(){
            this.left=new BlogLeft();
            this.search=new Search();
            this.content=new BlogContent();
        },
        
        render:function(){
            this.$el.append(this.search.render().$el);
            this.$el.append(this.left.render().$el);
            this.$el.append(this.content.render().$el);
            return this;
        }
        
    });
    
    return blogHome;
    
});