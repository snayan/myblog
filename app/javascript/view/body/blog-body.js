/**
 * Created by zhangyang on 6/7/16.
 */

/* blog home view */

define([
    'backbone',
    'javascript/view/body/left/blog-left',
    'javascript/view/body/content/blog-content',
    'javascript/view/body/search',
    // 'javascript/route/blog-router'
],function(Backbone,BlogLeft,BlogContent,Search,BlogRouter){
   'use strict'
    
    var blogHome=Backbone.View.extend({
        
        tagName:'div',
        
        className:'blog-home',

        initialize:function(){
            this.left=new BlogLeft();
            this.search=new Search();
            this.content=new BlogContent();
            // this.router=new BlogRouter();
            this.content.listenTo(this.search,'search',this.content.search);
            this.content.listenTo(this.left,'search',this.content.search);
        },
        
        render:function(){
            // var $div=$("<div>");
            // $div.append(this.search.render().$el);
            // $div.append(this.left.render().$el);
            // $div.append(this.content.render().$el);
            // this.$el.html($div.html());
            this.$el.append(this.search.render().$el);
            this.$el.append(this.left.render().$el);
            this.$el.append(this.content.render().$el);
            return this;
        }
        
    });
    
    return blogHome;
    
});