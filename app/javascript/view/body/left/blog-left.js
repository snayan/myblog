/**
 * Created by zhangyang on 6/4/16.
 */

/* blog home page left div view */

define([
    'backbone',
    'javascript/view/body/left/left-category',
    'javascript/view/body/left/left-tag'
],function(Backbone,Category,Tag){
    'use strict'
    
    var left=Backbone.View.extend({
        
        tagName:'div',
        
        className:'blog-left-div',
        
        events:{
            'click':'search'
        },
        
        initialize:function(){
            this.category=new Category();
            this.tag=new Tag();
        },
        
        render:function(){
            this.$el.html();
            this.$el.append(this.category.render().$el);
            this.$el.append(this.tag.render().$el);
            return this;
        },

        search:function (e) {
            e.preventDefault();
            var $el=this.$(e.target);
            if($el.is('a')) {
                this.trigger('search', $el.data('value'));
            }
        }
    });

    return left;
    
})